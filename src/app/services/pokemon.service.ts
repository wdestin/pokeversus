import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemons: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  private generateUrls(): string[] {
    let urls: string[] = [];

    for (let i = 1; i <= 893; i++) {
      urls.push(`${environment.apiUrl}/${i}`);
    }
    return urls;
  }

  private isCacheEmpty(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      caches.open(environment.cacheName).then((cache) => {
        cache.keys().then((keys) => {
          resolve(keys.length === 0);
        });
      });
    });
  }

  private storePokemonsToCache(): Promise<void> {
    return new Promise((resolve, reject) => {
      caches.open(environment.cacheName).then((cache) => {
        let urls: string[] = this.generateUrls();
        cache.addAll(urls).then(() => {
          this.retrievePokemonsFromCache();
          resolve();
        });
      });
    });
  }

  private retrievePokemonsFromCache(): Promise<void> {
    return new Promise((resolve, reject) => {
      caches.open(environment.cacheName).then((cache) => {
        cache.keys().then((keys) => {
          keys.forEach((request, index, array) => {
            cache
              .match(request)
              .then((response) => response.json())
              .then((data) => {
                this.pokemons.push(data);
                this.pokemons.sort((a, b) => a.id - b.id);
                if (index === array.length - 1) resolve();
              });
          });
        });
      });
    });
  }

  private retrievePokemonsFromAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      let urls: string[] = this.generateUrls();
      urls.forEach((url, index, array) => {
        this.http.get<Pokemon>(url).subscribe((pokemon) => {
          this.pokemons.push(pokemon);
          this.pokemons.sort((a, b) => a.id - b.id);
          if (index === array.length - 1) resolve();
        });
      });
    });
  }

  private fetchPokemons(): Promise<void> {
    return new Promise((resolve, reject) => {
      caches
        .has(environment.cacheName)
        .then((response) => {
          if (response === false) {
            this.storePokemonsToCache().then(() => resolve());
          } else {
            this.isCacheEmpty().then((isEmpty) => {
              if (isEmpty) this.storePokemonsToCache().then(() => resolve());
              else this.retrievePokemonsFromCache().then(() => resolve());
            });
          }
        })
        .catch(() => {
          this.retrievePokemonsFromAPI().then(() => resolve());
        });
    });
  }

  getPokemons(): Promise<Pokemon[]> {
    return new Promise((resolve, reject) => {
      if (this.pokemons.length === 0) {
        this.fetchPokemons().then(() => resolve(this.pokemons));
      } else {
        resolve(this.pokemons);
      }
    });
  }

  getPokemonsByName(name: string): Pokemon[] {
    return this.pokemons.filter((pokemon) => pokemon.name.includes(name));
  }

  getPokemon(id: number): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
      if (this.pokemons.length === 0) {
        caches
          .has(environment.cacheName)
          .then((response) => {
            if (response === true) {
              caches.open(environment.cacheName).then((cache) => {
                cache.keys().then((keys) => {
                  if (keys.length > 0) {
                    cache
                      .match(`${environment.apiUrl}/${id}`)
                      .then((response) => response.json())
                      .then((data) => {
                        resolve(data);
                      });
                  } else {
                    this.storePokemonsToCache().then(() =>
                      resolve(
                        this.pokemons.find((pokemon) => pokemon.id === id)
                      )
                    );
                  }
                });
              });
            } else {
              this.storePokemonsToCache().then(() =>
                resolve(this.pokemons.find((pokemon) => pokemon.id === id))
              );
            }
          })
          .catch(() => {
            this.http
              .get<Pokemon>(`${environment.apiUrl}/${id}`)
              .subscribe((pokemon) => resolve(pokemon));
          });
      } else {
        resolve(this.pokemons.find((pokemon) => pokemon.id === id));
      }
    });
  }
}
