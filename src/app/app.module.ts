import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonsComparisonComponent } from './pokemons-comparison/pokemons-comparison.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { LeadingZeroesPipe } from './leading-zeroes.pipe';
import { HeaderComponent } from './header/header.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    PokemonsComponent,
    PokemonsComparisonComponent,
    PokemonCardComponent,
    LeadingZeroesPipe,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
