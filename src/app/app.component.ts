import {Component, OnInit, NgZone} from '@angular/core';
import {Location} from '@angular/common';
import {HomeComponent} from './home';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [HomeComponent],
  providers:[]
})
export class AppComponent {
  
  title = 'match-tool works!';

  constructor() {

  }

}
