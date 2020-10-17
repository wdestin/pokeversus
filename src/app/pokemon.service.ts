import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private cacheName: string = 'pokemon';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private pokemons: Pokemon[] = [];
  private _pokemons = new Subject<Pokemon[]>();
  pokemons$ = this._pokemons.asObservable();

  constructor(private http: HttpClient) {
    this.fetchPokemons();
  }

  private generateUrls(): string[] {
    let urls: string[] = [];
    let i = 1;

    for (i = 1; i <= 893; i++) {
      urls.push(`${this.apiUrl}/${i}`);
    }
    return urls;
  }

  private storePokemonsToCache(): void {
    caches.open(this.cacheName).then((cache) => {
      let urls: string[] = this.generateUrls();
      cache.addAll(urls).then(() => {
        console.log('Data cached');
      });
    });
  }

  private retrievePokemonsFromCache(): void {
    caches.open(this.cacheName).then((cache) => {
      cache.keys().then((keys) => {
        keys.forEach((request) => {
          cache
            .match(request)
            .then((response) => response.json())
            .then((data) => {
              let pokemon: Pokemon = {
                id: data.id,
                name: data.name,
                sprite: data.sprites.front_default,
                hp: data.stats[0] === undefined ? 0 : data.stats[0].base_stat,
                attack:
                  data.stats[1] === undefined ? 0 : data.stats[1].base_stat,
                defense:
                  data.stats[2] === undefined ? 0 : data.stats[2].base_stat,
                specialAttack:
                  data.stats[3] === undefined ? 0 : data.stats[3].base_stat,
                specialDefense:
                  data.stats[4] === undefined ? 0 : data.stats[4].base_stat,
                speed:
                  data.stats[5] === undefined ? 0 : data.stats[5].base_stat,
              };
              this.pokemons.push(pokemon);
              this.pokemons.sort((a, b) => a.id - b.id);
            });
        });
      });
    });
    this._pokemons.next(this.pokemons);
  }

  private fetchPokemons(): void {
    caches.has(this.cacheName).then((response) => {
      console.log(response);
      if (response === true) {
        this.retrievePokemonsFromCache();
      } else {
        this.storePokemonsToCache();
        this.retrievePokemonsFromCache();
      }
    });
  }

  getPokemonsByName(name: string): void {
    this._pokemons.next(
      this.pokemons.filter((pokemon) => pokemon.name.includes(name))
    );
  }

  getPokemon(id: number): Pokemon {
    return this.pokemons.find((pokemon) => pokemon.id === id);
  }
}
