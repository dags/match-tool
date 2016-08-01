import {Component, Injector, OnInit, bind, Input, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS, NgControl} from '@angular/forms';
import {DARService} from '../services/dar/dar.service';
import {DARQuestions} from '../dar-qs/dar';
import {OntologyService} from '../services/ontology/ontology.service';
import {AutoComplete} from 'primeng/primeng';
import {Panel} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'app-dar-qs',
  templateUrl: 'dar-qs.component.html',
  styleUrls: ['dar-qs.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES, TYPEAHEAD_DIRECTIVES, AutoComplete, Panel],
  providers: [DARService, DARQuestions, FORM_PROVIDERS, OntologyService],

})
export class DarQsComponent implements OnInit {

  @Output() darFormReady: EventEmitter<Object>;
  public darService: DARService;
  public asyncSelected: string = '';
  darForm: any;
  dar: DARQuestions;
  ontologyService: OntologyService;
  prevSelected: string = '';
  typeaheadLoading: boolean = false;
  typeaheadNoResults: boolean = false;
  ontologies: Array<string> = [];
  ontologyMap: any = new Object();
  _cache: any;
  ontologiesSelectedLabels: Array<string> = [];


  constructor(/*private builder: FormBuilder, */ darService: DARService, darQuestions: DARQuestions, ontologyService: OntologyService) {
    this.darService = darService;
    this.dar = new DARQuestions();
    this.ontologyService = ontologyService;
    this.darFormReady = new EventEmitter();
    /*
    this.darForm = builder.group({
      methods: ["", Validators.required],
      diseases: ["", Validators.required],
      controls: ["", Validators.required],
      population: ["", Validators.required],
      other: ["", Validators.required],
      othertext: ["", Validators.required],
      ontologies: ["", Validators.required],
      forProfit: ["", Validators.required],
      onegender: [this.dar.onegender, Validators.required],
      gender: ["", Validators.required],
      pediatric: ["", Validators.required],
      illegalbehave: ["", Validators.required],
      addiction: ["", Validators.required],
      sexualdiseases: ["", Validators.required],
      stigmatizediseases: ["", Validators.required],
      vulnerablepop: ["", Validators.required],
      popmigration: ["", Validators.required],
      psychtraits: ["", Validators.required],
      nothealth: ["", Validators.required],
    });
    */
  }

  // getAsyncData(context: any) {
  //   if (!this.isEmpty(context.asyncSelected)) {
  //     if (this.prevSelected === context.asyncSelected) {
  //       return this.ontologies;
  //     }
  //     this.prevSelected = context.asyncSelected;

  //     this.ontologyService.autocomplete(context.asyncSelected).subscribe(
  //       (data) => {
  //         this.ontologies = data.json();
  //         return this.ontologies;
  //       },
  //       err => {
  //         this.ontologies = err._body;
  //         return this.ontologies;
  //       }
  //     );
  //   }
  // }

  changeTypeaheadLoading(e: boolean) {
    this.typeaheadLoading = e;
  }

  changeTypeaheadNoResults(e: boolean) {
    this.typeaheadNoResults = e;
  }

  typeaheadOnSelect(e: any) {
    if (this.ontologyMap[e.item.id] == null) {
      this.ontologyMap[e.item.id] = e.item.label;
      this.dar.ontologies.push(e.item);
      this.ontologiesSelectedLabels.push(e.item.label);
      this.submitDarForm();
    }
    this.asyncSelected = "";
  }

  clearOntologies() {
    this.ontologyMap = new Object();
    this.ontologiesSelectedLabels = [];
    this.dar.ontologies = [];
    this.submitDarForm();
    this.asyncSelected = '';
  }

  clearAsyncSelected() {
    this.asyncSelected = '';
  }

  getOntologyFromMap(k) {
    return this.ontologyMap[k];
  }

  getContext() {
    return this;
  }

  clear() {
    this.dar = new DARQuestions();
    this.submitDarForm();

  }

  getValues() {
    return this.darForm.value;
  }

  submitDarForm() {
    if (this.dar.gender !== 'NG') {
      this.dar.onegender = true;
    }
    if (!this.isEmpty(this.dar.othertext)) {
      this.dar.other = true;
    } else {
      this.dar.other = false;
    }
    this.darService.getUseRestriction(JSON.stringify(this.dar))
      .subscribe(
      data => {
        this.darFormReady.emit(data.json());
      },
      err => {
        this.darFormReady.emit(err._body);
      }
      );

    this.darFormReady.emit(this.dar);
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0 || val.trim().length === 0) ? true : false;
  }

  private getFilteredOntologies(event) {

    let query = event.query;
    console.log("query: " + query);
    this.ontologyService.autocomplete(query).subscribe(
      (data) => {
        this.ontologies = data.json();
        console.log(JSON.stringify(this.ontologies));
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
    this.dar = new DARQuestions();
    this.dar.forProfit = true;
    this.dar.pediatric = true;
  }

}
