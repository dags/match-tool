import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatExpansionModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DulQsComponent } from './dul-qs/dul-qs.component';
import { DulJsonComponent } from './dul-json/dul-json.component';
import { DarQsComponent } from './dar-qs/dar-qs.component';
import { DarJsonComponent } from './dar-json/dar-json.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OntologiesSelectorComponent } from './ontologies-selector/ontologies-selector.component';
import { ResultsComponent } from './results/results.component';
import { DulInfoComponent } from './dul-info/dul-info.component';
import { DarInfoComponent } from './dar-info/dar-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DulQsComponent,
    DulJsonComponent,
    DarQsComponent,
    DarJsonComponent,
    OntologiesSelectorComponent,
    ResultsComponent,
    DulInfoComponent,
    DarInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    MatExpansionModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    
    AutoCompleteModule,
    PanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
