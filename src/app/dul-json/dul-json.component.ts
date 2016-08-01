import {Component, EventEmitter, Injector, OnInit, bind, Input, Output, ViewEncapsulation} from '@angular/core';
import {ConsentService} from '../services/consent/consent.service';
import {Panel} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'app-dul-json',
  templateUrl: 'dul-json.component.html',
  styleUrls: ['dul-json.component.css'],
  directives: [Panel],
  //encapsulation: ViewEncapsulation.Native
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
