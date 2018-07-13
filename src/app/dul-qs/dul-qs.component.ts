import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { OntologyService } from '../services/ontology.service';
import { Orsp } from '../models/orsp';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-dul-qs',
  templateUrl: './dul-qs.component.html',
  styleUrls: ['./dul-qs.component.css']
})
export class DulQsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  diseasesCtrl = new FormControl();
  filteredDiseases: any[];
  diseases: any[] = [];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef;

  @Output() dulFormReady: EventEmitter<Object>;
  dulForm: any;

  ontologies: Array<string> = [];
  ontologyMap: any = new Object();


  ontologiesSelectedLabels: Array<string> = [];
  filteredOntologiesMultiple: any[];

  prevSelected = '';

  constructor(private _formBuilder: FormBuilder, private ontologyService: OntologyService, private zone: NgZone) {

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

    this.dulFormReady = new EventEmitter();

    this.dulForm = this._formBuilder.group({
      generalUse: ['', Validators.compose([Validators.required])],
      diseaseRestrictions: ['', Validators.compose([Validators.required])],
      commercialUse: ['', Validators.compose([Validators.required])],
      methodsResearch: ['', Validators.compose([Validators.required])],
      aggregateResearch: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      controlSetOption: ['', Validators.compose([Validators.required])],
      populationRestrictions: ['', Validators.compose([Validators.required])],
      pediatric: ['', Validators.compose([Validators.required])],
      dateRestriction: ['', Validators.compose([Validators.required])],
      ontologiesSelectedLabels: [],
      hmbResearch: ['', Validators.compose([Validators.required])],
    });

    this.dulForm.valueChanges
      .subscribe(data => {
        this.processForm();
      });
  }

  submitConsentForm() {
    this.dulFormReady.emit(this.dulForm.value);
  }

  clear() {
    this.dulForm.marskAsTouched();
  }

  clearOntologies() {
    this.ontologyMap = new Object();
    this.ontologiesSelectedLabels = [];
    this.submitConsentForm();
  }

  getOntologyFromMap(k) {
    return this.ontologyMap[k];
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
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
    const answers = this.dulForm.value;
    const info = {};

    if (answers.generalUse === 'true') {
      info['generalUse'] = true;
    }

    if (answers.methodsResearch === 'true') {
      info['methodsResearch'] = true;
    }

    if (answers.controlSetOption === 'true') {
      info['controlSetOption'] = true;
    }

    if (this.diseases.length > 0) {
      const diseasesList = [];
      this.diseases.forEach(disease => {
        diseasesList.push(disease.id);
      });
      info['diseaseRestrictions'] = diseasesList;
    }

    // generalUse: ['', Validators.compose([Validators.required])],
    // diseaseRestrictions: ['', Validators.compose([Validators.required])],
    // commercialUse: ['', Validators.compose([Validators.required])],
    // methodsResearch: ['', Validators.compose([Validators.required])],
    // aggregateResearch: ['', Validators.compose([Validators.required])],
    // gender: ['', Validators.compose([Validators.required])],
    // controlSetOption: ['', Validators.compose([Validators.required])],
    // populationRestrictions: ['', Validators.compose([Validators.required])],
    // pediatric: ['', Validators.compose([Validators.required])],
    // dateRestriction: ['', Validators.compose([Validators.required])],
    // ontologiesSelectedLabels: [],
    // hmbResearch: ['', Validators.compose([Validators.required])],
    console.log(answers);
    console.log(info);
    this.dulFormReady.emit(info);

  }

}

// "gender",
// "ethicsApprovalRequired",
// "diseaseRestrictions",
// "cloudStorage",
// "stigmatizeDiseases",
// "addiction",
// "other",
// "sexualDiseases",
// "populationRestrictions",
// "populationOriginsAncestry",
// "recontactMay",
// "controlSetOption",
// "commercialUse",
// "vulnerablePopulations",
// "populationStructure",
// "illegalBehavior",
// "genomicPhenotypicData",
// "methodsResearch",
// "recontactMust",
// "hmbResearch",
// "aggregateResearch",
// "dateRestriction",
// "generalUse",
// "otherRestrictions",
// "recontactingDataSubjects",
// "geographicalRestrictions",
// "nonBiomedical",
// "psychologicalTraits",
// "pediatric"


