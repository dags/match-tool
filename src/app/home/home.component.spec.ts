/* tslint:disable:no-unused-variable */
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {ConsentService} from '../services/consent/consent.service';
import {OntologyService} from '../services/ontology/ontology.service';
import {OrspService} from '../services/orsp/orsp.service';

/* describe('Component: Home', () => {
  ontologyService: OntologyService;
  consentService: ConsentService;
  orspService: OrspService;

  it('should create an instance', () => {
    let component = new HomeComponent(ontologyService, consentService, orspService);
    expect(component).toBeTruthy();
  });
});
*/