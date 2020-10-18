import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemons-comparison',
  templateUrl: './pokemons-comparison.component.html',
  styleUrls: ['./pokemons-comparison.component.css'],
})
export class PokemonsComparisonComponent implements OnInit {
  pokemon1: Pokemon;
  pokemon2: Pokemon;
  radarChartType: ChartType = 'radar';
  chartOptions: RadialChartOptions = {
    responsive: true,
  };
  chartData: ChartDataSets[] = [];
  chartLabels: Label = ['HP', 'ATK', 'DEF', 'SPD', 'Sp. DEF', 'Sp. ATK'];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id1');
    let id2 = +this.route.snapshot.paramMap.get('id2');

    this.pokemonService.getPokemon(id).then((pokemon) => {
      this.pokemon1 = pokemon;
      this.pushPokemonToData(this.pokemon1);
    });

    this.pokemonService.getPokemon(id2).then((pokemon) => {
      this.pokemon2 = pokemon;
      this.pushPokemonToData(this.pokemon2);
    });
  }

  pushPokemonToData(pokemon: Pokemon): void {
    let dataSet: ChartDataSets = {
      data: [
        pokemon.stats[0].base_stat,
        pokemon.stats[1].base_stat,
        pokemon.stats[2].base_stat,
        pokemon.stats[5].base_stat,
        pokemon.stats[4].base_stat,
        pokemon.stats[3].base_stat,
      ],
      label: pokemon.name.toUpperCase(),
    };
    this.chartData.push(dataSet);
  }
}
