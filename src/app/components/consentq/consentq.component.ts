import {Component, Injector, OnInit, ResolvedProvider, bind, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, Control } from 'angular2/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Orsp} from './orsp';
import {OntologyService} from '../../services/ontology/ontology.service';

@Component({
    selector: 'consentq',
    templateUrl: 'app/components/consentq/consentq.html',
    directives: [FORM_DIRECTIVES, TYPEAHEAD_DIRECTIVES],
    providers: [OntologyService],
})

export class ConsentQComponent {

    @Output() consentFormReady: EventEmitter<Object>;
    consentForm: any;
    orsp: Orsp;
    gender: Control;
    ontologyService: OntologyService;
    asyncSelected: string = '';
    typeaheadLoading: boolean = false;
    typeaheadNoResults: boolean = false;
    ontologies: Array<string> = [];
    ontologyMap: any = new Object();
    _cache: any;
    _prevContext: any;
    ontologiesSelectedLabels: Array<string> = [];
    prevSelected: string = '';
    
    constructor(private _formBuilder: FormBuilder, ontologyService: OntologyService) {
        this.orsp = new Orsp();
        this.consentFormReady = new EventEmitter();
        this.ontologyService = ontologyService;
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
        this.orsp.gender = gender;
    }

    clear() {
        this.orsp = new Orsp();
        this.consentForm.marskAsTouched();
    }
    private getAsyncData(context: any) {
       if (!this.isEmpty(context.asyncSelected)) {
            if (this.prevSelected === context.asyncSelected) {
                return this.ontologies;
            }
            this.prevSelected = context.asyncSelected;
            this.ontologyService.autocomplete(context.asyncSelected).subscribe(
                (data) => {
                    this.ontologies = data.json();
                    return this.ontologies;
                },
                err => {
                    this.ontologies = err._body;
                    return this.ontologies;
                }
            );
        }
    }

    changeTypeaheadLoading(e: boolean) {
        this.typeaheadLoading = e;
    }

    changeTypeaheadNoResults(e: boolean) {
        this.typeaheadNoResults = e;
    }

    typeaheadOnSelect(e: any) {
        if (this.ontologyMap[e.item.id] == null) {
            this.ontologyMap[e.item.id] = e.item.label;
            this.orsp.diseaseRestrictions.push(e.item.id);
            this.ontologiesSelectedLabels.push(e.item.label);
            this.submitConsentForm();
        }
        this.asyncSelected = "";
    }

    clearOntologies() {
        this.ontologyMap = new Object();
        this.ontologiesSelectedLabels = [];
        this.orsp.diseaseRestrictions = [];
        this.submitConsentForm();
    }

    getOntologyFromMap(k) {
        return this.ontologyMap[k];
    }

    isEmpty(val) {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }

    getContext() {
        return this;
    }
}