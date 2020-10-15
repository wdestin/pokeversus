import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemon1: Pokemon = {
    id: 815,
    name: 'cinderace',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/815.png',
    base_experience: 265,
    height: 14,
    weight: 330,
    hp: 80,
    attack: 116,
    defense: 75,
    specialAttack: 65,
    specialDefense: 75,
    speed: 119,
  };

  pokemon2: Pokemon = {
    id: 4,
    name: 'charmander',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    base_experience: 265,
    height: 14,
    weight: 330,
    hp: 39,
    attack: 52,
    defense: 43,
    specialAttack: 60,
    specialDefense: 50,
    speed: 65,
  };

  pokemon3: Pokemon = {
    id: 132,
    name: 'ditto',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
    base_experience: 265,
    height: 14,
    weight: 330,
    hp: 48,
    attack: 48,
    defense: 75,
    specialAttack: 48,
    specialDefense: 48,
    speed: 48,
  };

  pokemon4: Pokemon = {
    id: 25,
    name: 'pikachu',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    base_experience: 265,
    height: 14,
    weight: 330,
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
  };

  pokemon5: Pokemon = {
    id: 491,
    name: 'darkrai',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/491.png',
    base_experience: 265,
    height: 14,
    weight: 330,
    hp: 70,
    attack: 90,
    defense: 90,
    specialAttack: 135,
    specialDefense: 90,
    speed: 125,
  };

  pokemon6: Pokemon = {
    id: 251,
    name: 'celebi',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/251.png',
    base_experience: 265,
    height: 14,
    weight: 330,
    hp: 100,
    attack: 100,
    defense: 100,
    specialAttack: 100,
    specialDefense: 100,
    speed: 100,
  };

  pokemons: Pokemon[] = [
    this.pokemon1,
    this.pokemon2,
    this.pokemon3,
    this.pokemon4,
    this.pokemon5,
    this.pokemon6,
  ];

  constructor() {}

  getPokemons(): Pokemon[] {
    return this.pokemons;
  }

  getPokemonsByName(name: string): Pokemon[] {
    return this.pokemons.filter((pokemon) => pokemon.name.includes(name));
  }

  getPokemon(id: number): Pokemon {
    return this.pokemons.find((pokemon) => pokemon.id === id);
  }
}
