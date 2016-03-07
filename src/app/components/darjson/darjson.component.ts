import {Component, Injector, OnInit, ResolvedProvider, bind, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'darjson',
    templateUrl: 'app/components/darjson/darjson.html'
})

export class DarJsonComponent {

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
}