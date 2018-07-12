import { Component, OnInit } from '@angular/core';
import { OntologyService } from '../services/ontology.service';
import { ConsentService } from '../services/consent.service';
import { OrspService } from '../services/orsp.service';
import { Orsp } from '../models/orsp';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'match-tool works!';
  public darJson: any = '';
  public consentJson: any = '';
  public results: any = '';
  public ontologyService: OntologyService;
  public consentService: ConsentService;
  public orspService: OrspService;

  consent: string;
  purpose: string;

  dulInfo = '';
  darInfo = '';

  constructor(ontologyService: OntologyService, consentService: ConsentService, orspService: OrspService) {
    this.orspService = orspService;
    this.ontologyService = ontologyService;
    this.consentService = consentService;
  }


  ngOnInit() {
  }

  match() {
    console.log('MATCH .....');
    this.results = '';
    const matchRequest = { purpose: this.darJson, consent: this.consentJson };

    this.ontologyService.match(JSON.stringify(matchRequest)).subscribe(
      data => {
        this.results = data.text();
      },
      err => {
        this.results = err._body;
      }
    );
  }

  clear() {
    this.darJson = '';
    this.consentJson = '';
    this.results = '';
  }

  processDarForm(evt) {
    // llamar al servicio que genera el JSON
    // this.darJson = JSON.stringify(evt, null, 2);
    this.darInfo = JSON.stringify(evt, null, 2);
    this.darJson = this.orspService.getUseRestriction(evt);
  }

  processDarInfoChange(evt) {

  }

  processDarJsonChange(evt) {
    // process dar
    this.darJson = evt;
  }

  processDulInfoChange(evt) {

  }

  processConsentJsonChange(evt: Event) {
    this.consentJson = evt;

  }

  processConsentForm(evt: Orsp) {
    this.dulInfo = JSON.stringify(evt, null, 2);
    this.consentJson = this.orspService.getUseRestriction(evt);
  }
}
