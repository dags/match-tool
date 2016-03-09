import {Component, Injector, OnInit, ResolvedProvider, bind, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, FORM_BINDINGS, CORE_DIRECTIVES, FORM_PROVIDERS, FormBuilder, Validators, Control, ControlGroup} from 'angular2/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {DARService} from '../../services/dar/dar.service';
import {DARQuestions} from '../darq/dar';
import {OntologyService} from '../../services/ontology/ontology.service';


@Component({
    selector: 'darq',
    templateUrl: 'app/components/darq/darq.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, TYPEAHEAD_DIRECTIVES],
    providers: [DARService, DARQuestions, FORM_PROVIDERS, OntologyService],
    viewBindings: [FORM_BINDINGS]
})

export class DarQComponent {

    @Output() darFormReady: EventEmitter<Object>;
    public darService: DARService;
    darForm: any;
    dar: DARQuestions;
    ontologyService: OntologyService;
    asyncSelected: string = '';
    typeaheadLoading: boolean = false;
    typeaheadNoResults: boolean = false;
    ontologies: Array<string> = [];
    ontologyMap: any = new Object();
    _cache: any;
    _prevContext: any;
    ontologiesSelectedLabels: Array<string> = [];

    constructor(private builder: FormBuilder, darService: DARService, darQuestions: DARQuestions, ontologyService: OntologyService) {
        this.darService = darService;
        this.dar = new DARQuestions();
        this.ontologyService = ontologyService;
        this.darFormReady = new EventEmitter();
        this.darForm = builder.group({
            methods: ["", Validators.required],
            diseases: ["", Validators.required],
            controls: ["", Validators.required],
            population: ["", Validators.required],
            other: ["", Validators.required],
            othertext: ["", Validators.required],
            ontologies: ["", Validators.required],
            forProfit: ["", Validators.required],
            onegender: [this.dar.onegender, Validators.required],
            gender: ["", Validators.required],
            pediatric: ["", Validators.required],
            illegalbehave: ["", Validators.required],
            addiction: ["", Validators.required],
            sexualdiseases: ["", Validators.required],
            stigmatizediseases: ["", Validators.required],
            vulnerablepop: ["", Validators.required],
            popmigration: ["", Validators.required],
            psychtraits: ["", Validators.required],
            nothealth: ["", Validators.required]
        });
    }

    private getAsyncData(context: any) {
        if (!this.isEmpty(context.asyncSelected)) {
            if (this._prevContext === context) {
                return this.ontologies;
            }
                  this._prevContext = context;

                this.ontologyService.autocomplete(context.asyncSelected).subscribe(
                    (data) => {
                        this.ontologies = data.json();
                        return this.ontologies;
                    },
                    err => {
                        this.ontologies = err._body;
                        return this.ontologies;
                    }
                );
        }
    }

    private changeTypeaheadLoading(e: boolean) {
        this.typeaheadLoading = e;
    }

    private changeTypeaheadNoResults(e: boolean) {
        this.typeaheadNoResults = e;
    }

    private typeaheadOnSelect(e: any) {
        if (this.ontologyMap[e.item.id] == null) {
            this.ontologyMap[e.item.id] = e.item.label;
            this.dar.ontologies.push(e.item);
            this.ontologiesSelectedLabels.push(e.item.label);
            this.submitDarForm();
        }
        this.asyncSelected = "";
    }

    private clearOntologies() {
        this.ontologyMap = new Object();
        this.ontologiesSelectedLabels = [];
        this.dar.ontologies =  [];
        this.submitDarForm();
    }

    private getOntologyFromMap(k) {
        return this.ontologyMap[k];
    }

    private getContext() {
        return this;
    }

    private clear() {
        this.dar = new DARQuestions();
        this.submitDarForm();

    }

    private getValues() {
        return this.darForm.value;
    }

    private submitDarForm() {
        this.darService.getUseRestriction(JSON.stringify(this.dar))
            .subscribe(
            data => {
                this.darFormReady.emit(data.json());
            },
            err => {
                this.darFormReady.emit(err._body);
            }
            );

        this.darFormReady.emit(this.dar);
    }

    private isEmpty(val) {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }

}