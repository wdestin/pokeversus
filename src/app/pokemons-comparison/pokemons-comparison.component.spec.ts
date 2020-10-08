import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsComparisonComponent } from './pokemons-comparison.component';

describe('PokemonsComparisonComponent', () => {
  let component: PokemonsComparisonComponent;
  let fixture: ComponentFixture<PokemonsComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
