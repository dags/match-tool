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
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef;

  @Output() dulFormReady: EventEmitter<Object>;
  dulForm: any;
  // orsp: Orsp;
  // gender: FormControl;

  // asyncSelected = '';
  // typeaheadLoading = false;
  // typeaheadNoResults = false;
  ontologies: Array<string> = [];
  ontologyMap: any = new Object();
  // _cache: any;
  // _prevContext: any;
  // orsp_gender: string;

  ontologiesSelectedLabels: Array<string> = [];
  filteredOntologiesMultiple: any[];

  prevSelected = '';

  constructor(private _formBuilder: FormBuilder, private ontologyService: OntologyService, private zone: NgZone) {

    this.filteredFruits = this.fruitCtrl.valueChanges
      .pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()
        )
      );

    // this.orsp = new Orsp();
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

  // genderChanged() {
  //   alert('Changed');
  // }

  // setGender(gender: string) {
  //   this.orsp.gender = gender;
  // }

  clear() {
    // this.orsp = new Orsp();
    this.dulForm.marskAsTouched();
  }

  // private getAsyncData(context: any) {

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

  clearOntologies() {
    this.ontologyMap = new Object();
    this.ontologiesSelectedLabels = [];
    // this.orsp.diseaseRestrictions = [];
    this.submitConsentForm();
    // this.asyncSelected = '';
  }

  getOntologyFromMap(k) {
    return this.ontologyMap[k];
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  // getContext() {
  //   return this;
  // }

  // clearAsyncSelected() {
  //   this.asyncSelected = '';
  // }

  // private getFilteredOntologies(event) {

  //   const query = event.query;
  //   // console.log('query: ' + query);
  //   this.ontologyService.autocomplete(query).subscribe(
  //     (data) => {
  //       this.ontologies = data.json();
  //       // console.log(JSON.stringify(this.ontologies));
  //       return this.ontologies;
  //     },
  //     err => {
  //       this.ontologies = err._body;
  //       console.log(JSON.stringify(this.ontologies));
  //       return this.ontologies;
  //     }
  //   );

  // }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    console.log('dul _filter : ' + value);
    const filterValue = value.toLowerCase();
    this.ontologyService.autocomplete(filterValue)
      .subscribe(
        result => {
          return result;
        },
        error => {
          console.log(error);
          return [];
        });
    return [];
    // return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
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


