import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[];
  selectedPokemons: number[] = new Array();
  numberOfPokemonsToLoad: number = 30;
  numberOfPokemonsToShow: number = this.numberOfPokemonsToLoad;

  constructor(
    private searchService: SearchService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemons = this.pokemonService.getPokemons();

    this.pokemonService.pokemons$.subscribe((pokemons) => {
      this.pokemons = pokemons;
    });

    this.searchService.searchTerms$.subscribe((terms) => {
      this.pokemonService.getPokemonsByName(terms);
    });
  }

  onScroll() {
    this.numberOfPokemonsToShow += this.numberOfPokemonsToLoad;
  }

  onSelect(selectedId: number) {
    let index: number = 0;
    index = this.selectedPokemons.indexOf(selectedId);
    if (-1 === index) {
      this.selectedPokemons.push(selectedId);
    } else {
      this.selectedPokemons.splice(index, 1);
    }
  }
}
