import { Component, OnInit } from '@angular/core';
import {OntologyService} from '../services/ontology/ontology.service';
import {AutoComplete} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'app-ontologies-selector',
  templateUrl: 'ontologies-selector.component.html',
  styleUrls: ['ontologies-selector.component.css'],
  directives: [AutoComplete],
  providers: [OntologyService],
})
export class OntologiesSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
