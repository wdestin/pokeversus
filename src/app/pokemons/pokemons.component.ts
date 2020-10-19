import { Component, AfterViewInit } from '@angular/core';
import { SearchService } from '../search.service';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements AfterViewInit {
  pokemons: Pokemon[] = [];
  selectedPokemons: number[] = [];
  numberOfPokemonsToShow: number = environment.numberOfPokemonsToLoad;

  constructor(
    private searchService: SearchService,
    private pokemonService: PokemonService
  ) {}

  ngAfterViewInit(): void {
    this.pokemonService.getPokemons().then((pokemons) => {
      this.pokemons = pokemons;
    });

    this.searchService.searchTerms$.subscribe((terms) => {
      this.pokemons = this.pokemonService.getPokemonsByName(terms);
    });
  }

  onScroll() {
    this.numberOfPokemonsToShow += environment.numberOfPokemonsToLoad;
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
