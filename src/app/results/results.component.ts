import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Panel} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.css'],
  directives: [Panel],
  //encapsulation: ViewEncapsulation.None
})
export class ResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
