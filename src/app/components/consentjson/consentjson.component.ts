import {Component, Injector, OnInit,ResolvedProvider,bind, Input, Output} from 'angular2/core';
import {ConsentService} from '../../services/consent/consent.service';

@Component({
    selector: 'consentjson',
    templateUrl: 'app/components/consentjson/consentjson.html',
    providers: [ConsentService]
})

export class ConsentJsonComponent {

    @Input() consentJson: string = "{id: \"CONSENT001\", useRestriction:\" jdjdjdjdjdjd\"}";
   
    constructor(private consentService: ConsentService) {
    }

    getJson() {
        return this.consentJson;
    }
}