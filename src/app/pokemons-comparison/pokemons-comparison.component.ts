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
    this.pokemon1 = this.pokemonService.getPokemon(id);
    if (this.pokemon1) this.pushPokemonToData(this.pokemon1);
    this.pokemon2 = this.pokemonService.getPokemon(id2);
    if (this.pokemon2) this.pushPokemonToData(this.pokemon2);
  }

  pushPokemonToData(pokemon: Pokemon): void {
    let dataSet: ChartDataSets = {
      data: [
        pokemon.hp,
        pokemon.attack,
        pokemon.defense,
        pokemon.speed,
        pokemon.specialDefense,
        pokemon.specialAttack,
      ],
      label: pokemon.name.toUpperCase(),
    };
    this.chartData.push(dataSet);
  }
}
