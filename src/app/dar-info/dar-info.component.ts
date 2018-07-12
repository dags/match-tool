import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dar-info',
  templateUrl: './dar-info.component.html',
  styleUrls: ['./dar-info.component.css']
})
export class DarInfoComponent implements OnInit {

  @Input() darInfo: string;
  @Output() darChanged: EventEmitter<Object>;

  constructor() {
    this.darChanged = new EventEmitter();
  }

  getJson() {
    return this.darInfo;
  }

  onDarInfoChange(event) {
    this.darInfo = event.currentTarget.value;
    this.darChanged.emit(JSON.parse(this.darInfo));
  }

  ngOnInit() {
  }

}
