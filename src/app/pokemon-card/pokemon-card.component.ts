import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Output() onSelection = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onSelect(id: number): void {
    this.onSelection.emit(id);
  }
}
