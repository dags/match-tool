import {Injectable} from 'angular2/core';
import {AppSettings} from '../config/app.settings';
import {Orsp} from '../../components/consentq/orsp';
import {And} from './and';
import {Or} from './or';
import {Not} from './not';
import {Named} from './named';
import {Everything} from './everything';
import {UseRestriction} from './userestriction';

@Injectable()
export class OrspService {

    public NON_PROFIT: string = "http://www.broadinstitute.org/ontologies/DURPO/Non_profit";
    public PEDIATRIC: string = "http://www.broadinstitute.org/ontologies/DURPO/children";
    public MALE: string = "http://www.broadinstitute.org/ontologies/DURPO/male";
    public BOYS: string = "http://www.broadinstitute.org/ontologies/DURPO/boys";
    public FEMALE: string = "http://www.broadinstitute.org/ontologies/DURPO/female";
    public GIRLS: string = "http://www.broadinstitute.org/ontologies/DURPO/girls";
    public METHODS_RESEARCH: string = "http://www.broadinstitute.org/ontologies/DURPO/methods_research";
    public AGGREGATE_ANALYSIS: string = "http://www.broadinstitute.org/ontologies/DURPO/aggregate_analysis";
    public CONTROL: string = "http://www.broadinstitute.org/ontologies/DURPO/control";

    constructor() {
    }

    public getUseRestriction(questions: Orsp): string {
        return JSON.stringify(this.process(questions), null, 2);
    }

    process(questions: Orsp): UseRestriction {
        let useRestriction: UseRestriction = null;
        let categoryRestrictions: UseRestriction[] = [];

        if (questions.generalUse == true) {
            useRestriction = new Everything();
            return useRestriction;
        }

        if (questions.diseaseRestrictions) {
             categoryRestrictions.push(this.buildRestriction(questions.diseaseRestrictions));
        }

        if (questions.populationRestrictions) {
            // categoryRestrictions.add(buildRestriction(populationRestrictions))
            // resource.requiresManualReview = true
        }

        if (questions.commercialUseExcluded) {
            categoryRestrictions.push(new Named(this.NON_PROFIT));
        }

        if (questions.gender == "male" && questions.pediatricLimited == true) {
            categoryRestrictions.push(new Named(this.BOYS));
        } else if (questions.gender == "female" && questions.pediatricLimited == true) {
            categoryRestrictions.push(new Named(this.GIRLS));
        } else if (questions.gender == "male" && questions.pediatricLimited == false) {
            categoryRestrictions.push(new Named(this.MALE));
        } else if (questions.gender == "female" && questions.pediatricLimited == false) {
            categoryRestrictions.push(new Named(this.FEMALE));
        } else if (questions.gender == "no restrictions" && questions.pediatricLimited == true) {
            categoryRestrictions.push(new Named(this.PEDIATRIC));
        }

        // This builds up the basic restriction before the big 3 are applied.
        if (!categoryRestrictions) {
            useRestriction = new Everything();
        } else if (categoryRestrictions.length == 1) {
            useRestriction = categoryRestrictions[0];
        } else {
            useRestriction = new And(categoryRestrictions)
        }

        // if (questions.dateRestriction) {
        //     useRestriction.requiresManualReview
        // }

        // if (questions.other) {
        //     resource.requiresManualReview
        // }

        if (questions.methodsResearchExcluded) {
            useRestriction = new Or([
                new And(
                    [useRestriction,
                        new Not(new Named(this.METHODS_RESEARCH))
                    ]),
                useRestriction
            ]);
        } else {
            useRestriction = new Or([new Named(this.METHODS_RESEARCH), useRestriction]);
        }

        if (questions.aggregateResearchExcluded == true) {
            useRestriction = new Or([new Not(new Named(this.AGGREGATE_ANALYSIS)), useRestriction]);
        } else {
            useRestriction = new Or([new Named(this.AGGREGATE_ANALYSIS), useRestriction]);
        }

        if (questions.controlSetExcluded == true) {
            useRestriction = new Or([useRestriction, new And([useRestriction, new Named(this.CONTROL)])])
        }
        return useRestriction;
    }

    buildRestriction(ontologies: string[]): UseRestriction {
        var useRestrictions: UseRestriction [] = [];      
        if (typeof ontologies != "undefined" && ontologies != null && ontologies.length > 0) {
            if (ontologies.length == 1) {
               return new Named(ontologies[0]);
            } else {
                ontologies.forEach(function(ontology) {
                   useRestrictions.push(new Named(ontology));
                });
                return new Or(useRestrictions);
            }
        }
        return null;
    }
}
