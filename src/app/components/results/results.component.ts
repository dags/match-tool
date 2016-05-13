import {Component, Injector, OnInit, bind, Input} from 'angular2/core';

@Component({
    selector: 'results',
    templateUrl: 'app/components/results/results.html'
})

export class ResultsComponent {

    @Input() results: string = "Si coincide";
   
    constructor() {
    }
}