import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { OntologyService } from '../services/ontology.service';
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

  @ViewChild('fruitInput') fruitInput: ElementRef;

  @Output() dulFormReady: EventEmitter<Object>;
  dulForm: any;

  ontologies: Array<string> = [];
  ontologyMap: any = new Object();

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
      generalUse: [''],
      diseaseRestrictions: [''],
      commercialUse: [''],
      methodsResearch: [''],
      aggregateResearch: [''],
      gender: [''],
      controlSetOption: [''],
      populationRestrictions: [''],
      populationOriginsAncestry: [''],
      pediatric: [''],
      dateRestriction: [''],
      ontologiesSelectedLabels: [],
      hmbResearch: [''],
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
    this.dulForm.patchValue({ generalUse: 'false', hmbResearch: 'false', populationOriginsAncestry: 'false' });
    this.processForm();
  }

  change(field, evt) {

    if (field === 'generalUse') {
      if (evt.value === 'true') {
        this.diseases = [];
        this.dulForm.patchValue({ hmbResearch: 'false', controlSetOption: 'false' });
      }
    }

    if (field === 'hmbResearch') {
      if (evt.value === 'true') {
        this.diseases = [];
        this.dulForm.patchValue({ generalUse: 'false', populationOriginsAncestry: 'true' });
      }
    }

    this.processForm();
  }

  processForm() {
    const answers = this.dulForm.value;
    console.log(JSON.stringify(answers, null, 2));

    const info = {};

    if (answers.generalUse === 'true') {
      info['generalUse'] = true;
    }

    if (answers.hmbResearch === 'true') {
      info['hmbResearch'] = true;
    }

    if (this.diseases.length > 0) {
      const diseasesList = [];
      this.diseases.forEach(disease => {
        diseasesList.push(disease.id);
      });
      info['diseaseRestrictions'] = diseasesList;
    }

    if (answers.populationOriginsAncestry === 'true') {
      info['populationOriginsAncestry'] = false;
    }

    if (answers.commercialUse === 'true') {
      info['commercialUse'] = false;
    }

    if (answers.methodsResearch === 'true') {
      info['methodsResearch'] = false;
    }

    if (answers.aggregateResearch === 'true') {
      info['aggregateResearch'] = false;
    }

    if (answers.controlSetOption === 'true') {
      info['controlSetOption'] = false;
    }

    if (answers.gender === 'Female' || answers.gender === 'Male') {
      info['gender'] = answers.gender;
    }

    if (answers.pediatric === 'true') {
      info['pediatric'] = true;
    }
    this.dulFormReady.emit(info);
  }

}

