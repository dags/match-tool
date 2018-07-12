import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dul-info',
  templateUrl: './dul-info.component.html',
  styleUrls: ['./dul-info.component.css']
})
export class DulInfoComponent implements OnInit {

  @Input() dulInfo: string;
  @Output() dulChanged: EventEmitter<Object>;

  constructor() {
    this.dulChanged = new EventEmitter();
  }

  getJson() {
    return this.dulInfo;
  }

  onDulInfoChange(event) {
    this.dulInfo = event.currentTarget.value;
    this.dulChanged.emit(JSON.parse(this.dulInfo));
  }

  ngOnInit() {
  }

}
