import {Component, Injector, OnInit, ResolvedProvider, bind, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, FORM_BINDINGS, CORE_DIRECTIVES, FORM_PROVIDERS, FormBuilder, Validators, Control, ControlGroup} from 'angular2/common';
import {DARService} from '../../services/dar/dar.service';
import {DARQuestions} from '../darq/dar';


@Component({
    selector: 'darq',
    templateUrl: 'app/components/darq/darq.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [DARService, DARQuestions, FORM_PROVIDERS],
    viewBindings: [FORM_BINDINGS]
})

export class DarQComponent {

    @Output() darFormReady: EventEmitter<Object>;
    public darService: DARService;
    darForm: any;
    dar: DARQuestions;
    
    // 
    //     dar = {
    //         methods: Boolean = null,
    //         diseases: Boolean = null,
    //         controls: Boolean = null,
    //         population: Boolean = null,
    //         other: Boolean = null,
    //         othertext: String = null,
    //         ontologies: String = null,
    //         forProfit: Boolean = null,
    //         onegender: String = null,
    //         gender: Boolean = null,
    //         pediatric: Boolean = null,
    //         illegalbehave: Boolean = null,
    //         addiction: Boolean = null,
    //         sexualdiseases: Boolean = null,
    //         stigmatizediseases: Boolean = null,
    //         vulnerablepop: Boolean = null,
    //         popmigration: Boolean = null,
    //         psychtraits: Boolean = null,
    //         nothealth: Boolean = null
    // 
    //     };

    constructor(private builder: FormBuilder, darService: DARService, darQuestions: DARQuestions) {
        this.darService = darService;
        this.dar = new DARQuestions();
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

    submitDarForm() {
        // alert(this.dar);
        
        // this.darService.getUseRestriction(this.darForm.value)
        //     .subscribe(
        //     data => {
        //         this.darFormReady.emit(data.text());
        //     },
        //     err => {
        //         this.darFormReady.emit(err._body);
        //     }
        //     );
            
        this.darFormReady.emit(this.dar);
    }

    clear() {
        this.dar = new DARQuestions();
        this.submitDarForm();
             
    }
    
    getValues() {
        return this.darForm.value;
    }
}