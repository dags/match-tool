import {Component, OnInit, NgZone} from 'angular2/core';
import {RouteConfig, RouterOutlet, RouterLink, Location, Router, AsyncRoute} from 'angular2/router';
import {ConsentJsonComponent} from '../consentjson/consentjson.component';
import {ConsentQComponent} from '../consentq/consentq.component';
import {DarJsonComponent} from '../darjson/darjson.component';
import {DarQComponent} from '../darq/darq.component'
import {ResultsComponent} from '../results/results.component'
import {ConsentService} from '../../services/consent/consent.service';
import {OntologyService} from '../../services/ontology/ontology.service';
import {UseRestriction} from '../../services/orsp/userestriction';
import {OrspService} from '../../services/orsp/orsp.service';
import {Orsp} from '../consentq/orsp';

@Component({
    selector: 'main',
    templateUrl: 'app/components/main/main.html',
    directives: [ConsentJsonComponent, DarJsonComponent, ConsentQComponent, DarQComponent, ResultsComponent],
    providers: [ConsentService, OntologyService, OrspService]
})
export class MainComponent {

    public darJson: any = "";
    public consentJson: any = "";
    public results: any = "";
    public ontologyService: OntologyService;
    public consentService: ConsentService;
    public orspService: OrspService;

    constructor(ontologyService: OntologyService, consentService: ConsentService,
        orspService: OrspService) {
        this.orspService = orspService;
        this.ontologyService = ontologyService;
        this.consentService = consentService;
    }

    match() {
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
       this.darJson = JSON.stringify(evt, null, 2);
    }

}