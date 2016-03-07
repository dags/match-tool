export class Orsp {
    public generalUse: Boolean;
    public diseaseRestrictions: String[];
    public commercialUseExcluded: Boolean;
    public methodsResearchExcluded: Boolean;
    public aggregateResearchExcluded: Boolean;
    public gender: string;
    public controlSetExcluded: Boolean;
    public populationRestrictions: String[];
    public pediatricLimited: Boolean;
    public dateRestriction: Date;

    constructor() {
        this.generalUse = false;
        this.diseaseRestrictions = null;
        this.commercialUseExcluded = false;
        this.methodsResearchExcluded = false;
        this.aggregateResearchExcluded = false;
        this.gender = "no restrictions";
        this.controlSetExcluded = false;
        this.populationRestrictions = null;
        this.pediatricLimited = false;
        this.dateRestriction = null;
    }
}

