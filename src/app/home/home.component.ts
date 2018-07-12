import { Component, OnInit, NgZone } from '@angular/core';
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

  consent: string;
  purpose: string;

  dulInfo = '';
  darInfo = '';

  constructor(private ontologyService: OntologyService,
    private zone: NgZone) {
  }

  ngOnInit() {
  }

  clear() {
    this.darJson = '';
    this.consentJson = '';
    this.results = '';
  }


  processDarInfoChange(evt) {
    this.zone.run(() => {
      this.darInfo = JSON.stringify(evt, null, 2);
      this.translate_dar();
    });
  }

  processDulInfoChange(evt) {
    this.zone.run(() => {
    this.dulInfo = JSON.stringify(evt, null, 2);
    this.translate_dul();
    });
  }

  processDarJsonChange(evt) {
    this.darJson = evt;
  }

  processConsentJsonChange(evt: Event) {
    this.consentJson = evt;
  }

  processDarForm(evt) {
    this.darInfo = JSON.stringify(evt, null, 2);
    this.translate_dar();
  }

  processConsentForm(evt: Orsp) {
    this.dulInfo = JSON.stringify(evt, null, 2);
    this.translate_dul();
  }

  translate_dar() {
    this.ontologyService.translate_dar(this.darInfo)
      .subscribe(
        result => {
          this.darJson = JSON.stringify(result, null, 2);
        },
        error => {
          this.darJson = JSON.stringify(error);
        });
  }

  translate_dul() {
    this.ontologyService.translate_dul(this.dulInfo)
      .subscribe(
        result => {
          this.consentJson = JSON.stringify(result, null, 2);
        },
        error => {
          this.consentJson = JSON.stringify(error);
        });
  }

  match() {
    console.log('MATCH .....');
    this.results = '';

    const matchRequest = { purpose: JSON.parse(this.darJson), consent: JSON.parse(this.consentJson) };

    this.ontologyService.match(JSON.stringify(matchRequest))
      .subscribe(
        data => {
          this.results = JSON.stringify(data, null, 2);
        },
        error => {
          this.results = JSON.stringify(error);
        }
      );
  }

}
