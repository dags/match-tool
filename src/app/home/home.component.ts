import {Component, OnInit, NgZone} from '@angular/core';
import {Location} from '@angular/common';
import {DulJsonComponent} from '../dul-json';
import {DulQsComponent} from '../dul-qs';
import {DarJsonComponent} from '../dar-json';
import {DarQsComponent} from '../dar-qs'
import {ResultsComponent} from '../results'
import {ConsentService} from '../services/consent/consent.service';
import {OntologyService} from '../services/ontology/ontology.service';
import {UseRestriction} from '../services/orsp/userestriction';
import {OrspService} from '../services/orsp/orsp.service';
import {Button} from 'primeng/primeng';
import {Orsp} from '../dul-qs/orsp';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [DulJsonComponent, DarJsonComponent, DulQsComponent, DarQsComponent, ResultsComponent, Button],
  providers: [ConsentService, OntologyService, OrspService]
})
export class HomeComponent {
  
  title = 'match-tool works!';
  public darJson: any = "";
  public consentJson: any = "";
  public results: any = "";
  public ontologyService: OntologyService;
  public consentService: ConsentService;
  public orspService: OrspService;

  constructor(ontologyService: OntologyService, consentService: ConsentService, orspService: OrspService) {
    this.orspService = orspService;
    this.ontologyService = ontologyService;
    this.consentService = consentService;
  }

  match() {
    console.log("MATCH .....");
    this.results = "";
    var matchRequest = '{"purpose":' + this.darJson + ', "consent":' + this.consentJson + '}';
    this.ontologyService.match(matchRequest).subscribe(
      data => {
        this.results = data.text();
      },
      err => {
        this.results = err._body;
      }
    );
  }

  clear() {
    this.darJson = "";
    this.consentJson = "";
    this.results = "";
  }

  processDarForm(evt: Event) {
    //llamar al servicio que genera el JSON
    this.darJson = JSON.stringify(evt, null, 2);
  }

  processDarJsonChange(evt: Event) {
    //process dar
    this.darJson = evt;
  }

  processConsentJsonChange(evt: Event) {
    this.consentJson = evt;
  }

  processConsentForm(evt: Orsp) {
    let ur = this.orspService.getUseRestriction(evt);
    this.consentJson = ur;
  }
}
