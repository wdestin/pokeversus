import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemons-comparison',
  templateUrl: './pokemons-comparison.component.html',
  styleUrls: ['./pokemons-comparison.component.css'],
})
export class PokemonsComparisonComponent implements AfterViewInit {
  pokemons: Pokemon[] = [];
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

  ngAfterViewInit(): void {
    this.route.snapshot.queryParams.pokemon
      .split(',')
      .map(Number)
      .forEach((id: number) => {
        this.pokemonService.getPokemon(id).then((pokemon) => {
          this.pokemons.push(pokemon);
          setTimeout(() => {
            this.pushPokemonToData(pokemon);
          }, 100);
        });
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
