import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConsentService } from '../services/consent.service';

@Component({
  selector: 'app-dul-json',
  templateUrl: './dul-json.component.html',
  styleUrls: ['./dul-json.component.css']
})
export class DulJsonComponent implements OnInit {

  @Input() consentJson: string;
  @Output() consentChanged: EventEmitter<Object>;

  constructor(private consentService: ConsentService) {
    this.consentChanged = new EventEmitter();
  }

  getJson() {
    return this.consentJson;
  }

  onConsentJsonChange(event) {
    this.consentJson = event.currentTarget.value;
    this.consentChanged.emit(this.consentJson);
  }

  ngOnInit() {
  }

}
