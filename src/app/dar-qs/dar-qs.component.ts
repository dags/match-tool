import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DARQuestions } from '../models/dar';
import { OntologyService } from '../services/ontology.service';
import { DarService } from '../services/dar.service';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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
  public darService: DarService;
  public asyncSelected = '';
  darForm: any;
  dar: DARQuestions;
  ontologyService: OntologyService;
  prevSelected = '';
  typeaheadLoading = false;
  typeaheadNoResults = false;
  ontologies: Array<string> = [];
  ontologyMap: any = new Object();
  _cache: any;
  ontologiesSelectedLabels: Array<string> = [];


  constructor(private builder: FormBuilder, darService: DarService, ontologyService: OntologyService) {
    this.darService = darService;
    this.dar = new DARQuestions();
    this.ontologyService = ontologyService;
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
      onegender: [this.dar.onegender, Validators.required],
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
        this.darFormReady.emit(this.darForm.value);
      });
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
    this.asyncSelected = '';
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

    const query = event.query;
    console.log('query: ' + query);
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
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

}
