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

  constructor(
    private searchService: SearchService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemons = this.pokemonService.getPokemons();
    this.searchService.searchTerms$.subscribe((terms) => {
      this.pokemons = this.pokemonService.getPokemonsByName(terms);
    });
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
