import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private cacheName: string = 'pokemon';
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private pokemons: Pokemon[] = [];
  private _pokemons = new Subject<Pokemon[]>();
  pokemons$ = this._pokemons.asObservable();

  constructor() {
    this.fetchPokemons();
  }

  private generateUrls(): string[] {
    let urls: string[] = [];

    for (let i = 1; i <= 893; i++) {
      urls.push(`${this.apiUrl}/${i}`);
    }
    return urls;
  }

  private storePokemonsToCache(): Promise<void> {
    return new Promise((resolve, reject) => {
      caches.open(this.cacheName).then((cache) => {
        let urls: string[] = this.generateUrls();
        cache.addAll(urls).then(() => {
          console.log('Data cached');
          this.retrievePokemonsFromCache();
          resolve();
        });
      });
    });
  }

  private retrievePokemonsFromCache(): Promise<void> {
    return new Promise((resolve, reject) => {
      caches.open(this.cacheName).then((cache) => {
        cache.keys().then((keys) => {
          keys.forEach((request) => {
            cache
              .match(request)
              .then((response) => response.json())
              .then((data) => {
                this.pokemons.push(data);
                this.pokemons.sort((a, b) => a.id - b.id);
              });
          });
          this._pokemons.next(this.pokemons);
          resolve();
        });
      });
    });
  }

  private fetchPokemons(): Promise<void> {
    return new Promise((resolve, reject) => {
      caches
        .has(this.cacheName)
        .then((response) => {
          console.log(response);
          if (response === true) {
            this.retrievePokemonsFromCache().then(() => resolve());
          } else {
            this.storePokemonsToCache().then(() => resolve());
          }
        })
        .catch((reason) => {
          reject();
        });
    });
  }

  getPokemons(): Pokemon[] {
    return this.pokemons;
  }

  getPokemonsByName(name: string): void {
    this._pokemons.next(
      this.pokemons.filter((pokemon) => pokemon.name.includes(name))
    );
  }

  getPokemon(id: number): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
      caches.has(this.cacheName).then((response) => {
        if (response === true) {
          caches.open(this.cacheName).then((cache) => {
            cache
              .match(`${this.apiUrl}/${id}`)
              .then((response) => response.json())
              .then((data) => {
                resolve(data);
              });
          });
        } else {
          this.storePokemonsToCache().then(() =>
            resolve(this.pokemons.find((pokemon) => pokemon.id === id))
          );
        }
      });
    });
  }
}
