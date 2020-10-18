import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonsComparisonComponent } from './pokemons-comparison/pokemons-comparison.component';

const routes: Routes = [
  { path: '', component: PokemonsComponent },
  { path: 'compare', component: PokemonsComparisonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
