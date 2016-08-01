import {Component, Injector, OnInit, bind, Input, Output, EventEmitter} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS, NgControl, FormControl, Validators} from '@angular/forms';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {OntologyService} from '../services/ontology/ontology.service';
import {AutoComplete} from 'primeng/primeng';
import {Panel} from 'primeng/primeng';
import {Orsp} from './orsp';

@Component({
  moduleId: module.id,
  selector: 'app-dul-qs',
  templateUrl: 'dul-qs.component.html',
  styleUrls: ['dul-qs.component.css'],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, TYPEAHEAD_DIRECTIVES, AutoComplete, Panel],
  providers: [OntologyService, FORM_PROVIDERS],
})
export class DulQsComponent implements OnInit {

  @Output() consentFormReady: EventEmitter<Object>;
  consentForm: any;
  orsp: Orsp;
  gender: FormControl;
  ontologyService: OntologyService;
  asyncSelected: string = '';
  typeaheadLoading: boolean = false;
  typeaheadNoResults: boolean = false;
  ontologies: Array<string> = [];
  ontologyMap: any = new Object();
  _cache: any;
  _prevContext: any;

  ontologiesSelectedLabels: Array<string> = [];
  filteredOntologiesMultiple: any[];

  prevSelected: string = '';

  constructor(/*private _formBuilder: FormBuilder, */ ontologyService: OntologyService) {
    this.orsp = new Orsp();
    this.consentFormReady = new EventEmitter();
    this.ontologyService = ontologyService;
    /*
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
    */
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
    console.log(JSON.stringify(e));
    if (this.ontologyMap[e.id] == null) {
      this.ontologyMap[e.id] = e.label;
      this.orsp.diseaseRestrictions.push(e.id);
      this.ontologiesSelectedLabels.push(e.label);
      this.submitConsentForm();
    }
    this.asyncSelected = "";
  }

  clearOntologies() {
    this.ontologyMap = new Object();
    this.ontologiesSelectedLabels = [];
    this.orsp.diseaseRestrictions = [];
    this.submitConsentForm();
    this.asyncSelected = "";
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

  clearAsyncSelected() {
    this.asyncSelected = '';
  }

  private getFilteredOntologies(event) {

    let query = event.query;
    //console.log("query: " + query);
    this.ontologyService.autocomplete(query).subscribe(
      (data) => {
        this.ontologies = data.json();
        //console.log(JSON.stringify(this.ontologies));
        return this.ontologies;
      },
      err => {
        this.ontologies = err._body;
        console.log(JSON.stringify(this.ontologies));
        return this.ontologies;
      }
    );

  }


  ngOnInit() {
  }

}
