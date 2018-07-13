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
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef;

  @Output() darFormReady: EventEmitter<Object>;
  // public darService: DarService;
  // public asyncSelected = '';
  darForm: any;
  // dar: DARQuestions;

  // prevSelected = '';
  // typeaheadLoading = false;
  // typeaheadNoResults = false;
  ontologies: Array<string> = [];
  ontologyMap: any = new Object();
  // _cache: any;
  ontologiesSelectedLabels: Array<string> = [];

  constructor(private builder: FormBuilder, private ontologyService: OntologyService, private zone: NgZone) {

    this.filteredFruits = this.fruitCtrl.valueChanges
      .pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()
        )
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

  clearOntologies() {
    this.ontologyMap = new Object();
    this.ontologiesSelectedLabels = [];
    // this.dar.ontologies = [];
    // this.submitDarForm();
    // this.asyncSelected = '';
  }

  // clearAsyncSelected() {
  //   this.asyncSelected = '';
  // }

  getOntologyFromMap(k) {
    return this.ontologyMap[k];
  }

  // getContext() {
  //   return this;
  // }

  clear() {
    // this.dar = new DARQuestions();
    // this.submitDarForm();
  }

  getValues() {
    return this.darForm.value;
  }

  // submitDarForm() {
  //   if (this.dar.gender !== 'NG') {
  //     this.dar.onegender = true;
  //   }
  //   if (!this.isEmpty(this.dar.othertext)) {
  //     this.dar.other = true;
  //   } else {
  //     this.dar.other = false;
  //   }
  //   this.darService.getUseRestriction(JSON.stringify(this.dar))
  //     .subscribe(
  //       data => {
  //         this.darFormReady.emit(data.json());
  //       },
  //       err => {
  //         this.darFormReady.emit(err._body);
  //       }
  //     );

  //   this.darFormReady.emit(this.dar);
  // }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0 || val.trim().length === 0) ? true : false;
  }

  ngOnInit() {
    // this.dar = new DARQuestions();
    // this.dar.forProfit = true;
    // this.dar.pediatric = true;
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
    console.log('dar _filter : ' + value);
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
    const answers = this.darForm.value;
    const info = {};

    if (answers.methods === true) {
      info['methodsResearch'] = true;
    }

    if (answers.controls === true) {
      info['controlSetOption'] = true;
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
