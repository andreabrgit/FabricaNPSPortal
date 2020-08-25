import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BarRatingModule } from "ngx-bar-rating";
import { ProjetoService } from './projeto/projeto.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AvaliacaoProjetoService } from './avaliacao-projeto/avaliacao-projeto.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BarRatingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule     
  ],
  providers: [
    ProjetoService,
    AvaliacaoProjetoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
