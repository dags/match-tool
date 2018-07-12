import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ontologies-selector',
  templateUrl: './ontologies-selector.component.html',
  styleUrls: ['./ontologies-selector.component.css']
})
export class OntologiesSelectorComponent implements OnInit {

  ontologiesSelectedLabels = [];
  ontologies = [];

  constructor() { }

  ngOnInit() {
  }

  clearOntologies() {

  }

  getFilteredOntologies(evt) {

  }
}
