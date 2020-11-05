import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonsComparisonComponent } from './pokemons-comparison/pokemons-comparison.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { LeadingZeroesPipe } from './pipes/leading-zeroes.pipe';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    InfiniteScrollModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
