export class DARQuestions {

    methods = false;
    diseases = false;
    controls = false;
    population = false;
    other = false;
    othertext: String = null;
    ontologies: Array<string> = null;
    forProfit = false;
    onegender = false;
    gender: String = null;
    pediatric = false;
    illegalbehave = false;
    addiction = false;
    sexualdiseases = false;
    stigmatizediseases = false;
    vulnerablepop = false;
    popmigration = false;
    psychtraits = false;
    nothealth = false;

    constructor() {
        this.onegender = false;
        this.gender = 'NG';
        this.ontologies = [];
    }
}
