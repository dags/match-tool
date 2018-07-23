import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { OntologyService } from '../services/ontology.service';
import { FormBuilder, FormControl } from '@angular/forms';
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
      methods: [''],
      diseases: [''],
      controls: [''],
      population: [''],
      hmb: [''],
      poa: [''],
      other: [''],
      othertext: [''],
      ontologies: [''],
      forProfit: [''],
      onegender: [''],
      gender: [''],
      pediatric: [''],
      illegalbehave: [''],
      addiction: [''],
      sexualdiseases: [''],
      stigmatizediseases: [''],
      vulnerablepop: [''],
      popmigration: [''],
      psychtraits: [''],
      nothealth: ['']
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

  change(field, evt) {

    console.log('change -------------------------------------------');
    console.log(field, evt);
    // if (field === 'generalUse') {
    //   if (evt.value === 'true') {
    //     this.diseases = [];
    //     this.darForm.patchValue({ hmbResearch: 'false', controlSetOption: 'true' });
    //   }
    // }

    // if (field === 'hmbResearch') {
    //   if (evt.value === 'true') {
    //     this.diseases = [];
    //     this.darForm.patchValue({ generalUse: 'false', populationOriginsAncestry: 'true' });
    //   }
    // }

    this.processForm();
  }

  processForm() {
    const answers = this.darForm.value;
    const info = {};

    /* if (answers.diseases === true) {
      info['diseaseRelated'] = true;
    } */

    if (answers.methods === true) {
      info['methodsResearch'] = false;
    }

    if (answers.controls === true) {
      info['controlSetOption'] = true;
    }

    /* if (answers.population === true) {
      info['populationStructure'] = true;
    } */

    if (answers.hmb === true) {
      info['hmbResearch'] = true;
    }

    if (answers.poa === true) {
      info['populationOriginsAncestry'] = true;
    }

    if (answers.other === true) {
      info['other'] = true;
      info['otherRestrictions'] = answers.othertext;
    }

    if (this.diseases.length > 0) {
      const diseasesList = [];
      this.diseases.forEach(disease => {
        diseasesList.push(disease.id);
      });
      info['diseaseRestrictions'] = diseasesList;
    }

    if (answers.forProfit === 'true') {
      info['notForProfit'] = false;
    }

    if (answers.gender === 'M') {
      info['gender'] = 'male';
    }

    if (answers.gender === 'F') {
      info['gender'] = 'female';
    }

    if (answers.pediatric === 'true') {
      info['pediatric'] = true;
    }

    if (answers.illegalbehave === 'true') {
      info['illegalBehavior'] = true;
    }

    if (answers.addiction === 'true') {
      info['addiction'] = true;
    }

    if (answers.sexualdiseases === 'true') {
      info['sexualDiseases'] = true;
    }

    if (answers.stigmatizediseases === 'true') {
      info['stigmatizeDiseases'] = true;
    }

    if (answers.vulnerablepop === 'true') {
      info['vulnerablePopulations'] = true;
    }

    if (answers.popmigration === 'true') {
      info['populationOriginsAncestry'] = true;
    }

    if (answers.psychtraits === 'true') {
      info['psychologicalTraits'] = true;
    }

    if (answers.nothealth === 'true') {
      info['nonBiomedical'] = true;
    }

    console.log(info);
    this.darFormReady.emit(info);

  }
}

