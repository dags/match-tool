import {Component, Injector, OnInit, ResolvedProvider, bind, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, Control } from 'angular2/common';
// import { RadioControlValueAccessor} from '../../directives/RadioControlValueAccessor';
import {Orsp} from './orsp';

@Component({
    selector: 'consentq',
    templateUrl: 'app/components/consentq/consentq.html',
    directives: [FORM_DIRECTIVES]
})

export class ConsentQComponent {

    @Output() consentFormReady: EventEmitter<Object>;
    consentForm: any;
    orsp: Orsp;
    gender: Control;

    constructor(private _formBuilder: FormBuilder) {
        this.orsp = new Orsp();
        this.consentFormReady = new EventEmitter();
        // this.gender = new Control();
        // this.gender.registerOnChange(genderChanged());
        
        this.consentForm = this._formBuilder.group({
            generalUse: ['', Validators.compose([Validators.required])],
            diseaseRestrictions: ['', Validators.compose([Validators.required])],
            commercialUseExcluded: ['', Validators.compose([Validators.required])],
            methodsResearchExcluded: ['', Validators.compose([Validators.required])],
            aggregateResearchExcluded: ['', Validators.compose([Validators.required])],
            gender: ['', Validators.compose([Validators.required])],
            controlSetExcluded: ['', Validators.compose([Validators.required])],
            populationRestrictions: ['', Validators.compose([Validators.required])],
            pediatricLimited: ['', Validators.compose([Validators.required])],
            dateRestriction: ['', Validators.compose([Validators.required])]
        });
    }

    submitConsentForm() {
        this.consentFormReady.emit(this.orsp);
    }

    genderChanged() {
        alert("Changed");
    }

    setGender(gender: string) {
        alert("gender: " + gender);
        this.orsp.gender = gender;
        alert("gender 2: " + this.orsp.gender);

    }

    clear() {
        this.orsp = new Orsp();
        this.consentForm.marskAsTouched();
    }
}