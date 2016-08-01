import {Component, Injector, OnInit, bind, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {Panel} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'app-dar-json',
  templateUrl: 'dar-json.component.html',
  styleUrls: ['dar-json.component.css'],
  directives: [Panel],
  encapsulation: ViewEncapsulation.Emulated
})
export class DarJsonComponent implements OnInit {

  @Input() darJson: string;
  @Output() darChanged: EventEmitter<Object>;

  constructor() {
    this.darChanged = new EventEmitter();
  }

  onDarJsonChange(event) {
    this.darJson = event.currentTarget.value;
    this.darChanged.emit(this.darJson);
  }

  getJson() {
    return this.darJson;
  }

  ngOnInit() {
  }

}
