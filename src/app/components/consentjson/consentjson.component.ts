import {Component, EventEmitter, Injector, OnInit, bind, Input, Output} from '@angular/core';
import {ConsentService} from '../../services/consent/consent.service';

@Component({
    selector: 'consentjson',
    templateUrl: 'app/components/consentjson/consentjson.html',
    providers: [ConsentService]
})

export class ConsentJsonComponent {

    @Input() consentJson: string;
    @Output() consentChanged: EventEmitter<Object>;

    constructor(private consentService: ConsentService) {
        this.consentChanged = new EventEmitter();
    }

    getJson() {
        return this.consentJson;
    }

    onConsentJsonChange(event) {
        this.consentJson = event.currentTarget.value;
        this.consentChanged.emit(this.consentJson);
    }

}