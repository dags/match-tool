import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { DARQuestions } from '../models/dar';
import { OntologyService } from '../services/ontology.service';
import { DarService } from '../services/dar.service';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-dar-qs',
  templateUrl: './dar-qs.component.html',
  styleUrls: ['./dar-qs.component.css']
})
export class DarQsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  diseasesCtrl = new FormControl();
  filteredDiseases: any[];
  diseases: any[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef;

  @Output() darFormReady: EventEmitter<Object>;
  darForm: any;
  ontologies: Array<string> = [];
  ontologyMap: any = new Object();
  ontologiesSelectedLabels: Array<string> = [];

  constructor(private builder: FormBuilder, private ontologyService: OntologyService, private zone: NgZone) {

    this.diseasesCtrl.valueChanges
      .subscribe(
        (value) => {
          if (typeof value === 'string') {
            const filterValue = value.toLowerCase();
            this.ontologyService.autocomplete(filterValue)
              .subscribe(
                result => {
                  this.filteredDiseases = result;
                },
                error => {
                  console.log(error);
                  return [];
                });
          }
        },
        error => {
          console.log(error);
        }
      );

    // this.dar = new DARQuestions();
    this.darFormReady = new EventEmitter();

    this.darForm = builder.group({
      methods: ['', Validators.required],
      diseases: ['', Validators.required],
      controls: ['', Validators.required],
      population: ['', Validators.required],
      hmb: ['', Validators.required],
      poa: ['', Validators.required],
      other: ['', Validators.required],
      othertext: ['', Validators.required],
      ontologies: ['', Validators.required],
      forProfit: ['', Validators.required],
      onegender: ['', Validators.required],
      gender: ['', Validators.required],
      pediatric: ['', Validators.required],
      illegalbehave: ['', Validators.required],
      addiction: ['', Validators.required],
      sexualdiseases: ['', Validators.required],
      stigmatizediseases: ['', Validators.required],
      vulnerablepop: ['', Validators.required],
      popmigration: ['', Validators.required],
      psychtraits: ['', Validators.required],
      nothealth: ['', Validators.required],
      ontologiesSelectedLabels: []
    });

    this.darForm.valueChanges
      .subscribe(data => {
        this.processForm();
      });
  }

  submitDarForm() {
    this.darFormReady.emit(this.darForm.value);
  }

  clearOntologies() {
    this.ontologyMap = new Object();
    this.ontologiesSelectedLabels = [];
  }

  getOntologyFromMap(k) {
    return this.ontologyMap[k];
  }


  clear() {
  }

  getValues() {
    return this.darForm.value;
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0 || val.trim().length === 0) ? true : false;
  }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.diseases.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.diseasesCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.diseases.indexOf(fruit);
    if (index >= 0) {
      this.diseases.splice(index, 1);
      this.processForm();
    }

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.diseasesCtrl.setValue(null);
    this.diseases.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.processForm();
  }

  processForm() {
    const answers = this.darForm.value;
    const info = {};

    if (answers.methods === true) {
      info['methodsResearch'] = true;
    }

    if (answers.controls === true) {
      info['controlSetOption'] = true;
    }

    if (this.diseases.length > 0) {
      const diseasesList = [];
      this.diseases.forEach(disease => {
        diseasesList.push(disease.id);
      });
      info['diseaseRestrictions'] = diseasesList;
    }

    // methods: ['', Validators.required],
    // diseases: ['', Validators.required],
    // controls: ['', Validators.required],
    // population: ['', Validators.required],
    // hmb: ['', Validators.required],
    // poa: ['', Validators.required],
    // other: ['', Validators.required],
    // othertext: ['', Validators.required],
    // ontologies: ['', Validators.required],
    // forProfit: ['', Validators.required],
    // onegender: [this.dar.onegender, Validators.required],
    // gender: ['', Validators.required],
    // pediatric: ['', Validators.required],
    // illegalbehave: ['', Validators.required],
    // addiction: ['', Validators.required],
    // sexualdiseases: ['', Validators.required],
    // stigmatizediseases: ['', Validators.required],
    // vulnerablepop: ['', Validators.required],
    // popmigration: ['', Validators.required],
    // psychtraits: ['', Validators.required],
    // nothealth: ['', Validators.required],
    // ontologiesSelectedLabels: []

    this.darFormReady.emit(info);

  }

}


// "gender",
//   "ethicsApprovalRequired",
//   "diseaseRestrictions",
//   "cloudStorage",
//   "stigmatizeDiseases",
//   "addiction",
//   "other",
//   "sexualDiseases",
//   "populationRestrictions",
//   "populationOriginsAncestry",
//   "recontactMay",
//   "controlSetOption",
//   "commercialUse",
//   "vulnerablePopulations",
//   "populationStructure",
//   "illegalBehavior",
//   "genomicPhenotypicData",
//   "methodsResearch",
//   "recontactMust",
//   "hmbResearch",
//   "aggregateResearch",
//   "dateRestriction",
//   "generalUse",
//   "otherRestrictions",
//   "recontactingDataSubjects",
//   "geographicalRestrictions",
//   "nonBiomedical",
//   "psychologicalTraits",
//   "pediatric"
