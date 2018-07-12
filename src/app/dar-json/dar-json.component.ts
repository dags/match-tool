import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dar-json',
  templateUrl: './dar-json.component.html',
  styleUrls: ['./dar-json.component.css']
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
