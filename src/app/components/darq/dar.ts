export class DARQuestions {

    methods: boolean = false;
    diseases: Boolean = false;
    controls: Boolean = false;
    population: Boolean = false;
    other: Boolean = false;
    othertext: String = null;
    ontologies: Array<string> = null;
    forProfit: Boolean = false;
    onegender: boolean = false;
    gender: String = null;
    pediatric: Boolean = false;
    illegalbehave: Boolean = false;
    addiction: Boolean = false;
    sexualdiseases: Boolean = false;
    stigmatizediseases: Boolean = false;
    vulnerablepop: Boolean = false;
    popmigration: Boolean = false;
    psychtraits: Boolean = false;
    nothealth: Boolean = false;

    constructor() {
        this.onegender = false;
        this.ontologies = [];
    }

}