import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DebugHelper } from 'protractor/built/debugger';
import { Named } from '../models/named';
import { Not } from '../models/not';
import { And } from '../models/and';
import { UseRestriction } from '../models/userestriction';
import { Or } from '../models/or';
import { Everything } from '../models/everything';


const PEDIATRIC = 'http://www.broadinstitute.org/ontologies/DUOS/pediatric';
const FEMALE = 'http://www.broadinstitute.org/ontologies/DUOS/female';
const MALE = 'http://www.broadinstitute.org/ontologies/DUOS/male';
const GIRLS = 'http://www.broadinstitute.org/ontologies/DUOS/girls';
const BOYS = 'http://www.broadinstitute.org/ontologies/DUOS/boys';


/* Non-profit is subclass of DUO Data Use Requirements */
const DUO_DATA_USE_REQUIREMENTS = 'http://purl.obolibrary.org/obo/DUO_0000017';
const NON_PROFIT = 'http://purl.obolibrary.org/obo/DUO_0000018';

/* Control are subclasses of Dataset Usage */
const DATASET_USAGE = 'http://www.broadinstitute.org/ontologies/DUOS/dataset_usage';
const CONTROL = 'http://www.broadinstitute.org/ontologies/DUOS/control';

/* POA and HMB are subclasses of DUO Primary Category*/
const DUO_PRIMARY_CATEGORY = 'http://purl.obolibrary.org/obo/DUO_0000002';
const POPULATION_ORIGINS = 'http://purl.obolibrary.org/obo/DUO_0000011';
const HEALTH_MEDICAL_BIOMEDICAL = 'http://purl.obolibrary.org/obo/DUO_0000006';

/* Aggregate Research is a subclass of Research Type */
const RESEARCH_TYPE = 'http://www.broadinstitute.org/ontologies/DUOS/research_type';

/* Methods Research is a subclass of DUO Secondary Category */
const DUO_SECONDARY_CATEGORY = 'http://purl.obolibrary.org/obo/DUO_0000003';
const METHODS_RESEARCH = 'http://purl.obolibrary.org/obo/DUO_0000015';


@Injectable({
  providedIn: 'root'
})
export class RestrictionBuilderService {

  constructor() { }

  translateDar(darInfoTxt): Observable<any> {

    let restriction: UseRestriction;

    const darInfo = JSON.parse(darInfoTxt);
    console.log(JSON.stringify(darInfo, null, 2));

    if (darInfo.generalUse === true) {
      restriction = new Everything();
      return of(restriction);
    }

    const operandList = [];

    //
    //    Research related entries
    //
    const methodsList = [];
   
    //DATA USE FOR POPULATION STRUCTURE OR POA
    if (darInfo.populationStructure === true || darInfo.populationOriginsAncestry === true) {
      methodsList.push(new Named(POPULATION_ORIGINS));
    }

    //DATA USE FOR HMB
    if (darInfo.hmbResearch === true) {
      methodsList.push(new Named(HEALTH_MEDICAL_BIOMEDICAL));
    }

    //DATA USE FOR METHODS RESEARCH
    if (darInfo.methodsResearch === true) {
      methodsList.push(new Named(METHODS_RESEARCH));
    }

    if (darInfo.controlSetOption === true) {
      methodsList.push(new Named(CONTROL));
    } else 

    if (methodsList.length > 0) {
      operandList.push(this.buildAndRestriction(methodsList));
    }

    //
    //    Diseases related entries
    //
    if (darInfo.diseaseRestrictions && darInfo.diseaseRestrictions.length > 0) {
      operandList.push(this.buildORRestrictionFromClasses(darInfo.diseaseRestrictions));
    }

    //
    //    gender, age and commercial status entries
    //
    const purposesList = [];

    if (darInfo.gender) {
      if (darInfo.gender === 'male') {
        purposesList.push(new Named(MALE));
      } else if (darInfo.gender === 'female') {
        purposesList.push(new Named(FEMALE));
      }
    }

    if (darInfo.pediatric === true) {
      purposesList.push(new Named(PEDIATRIC));
    }

    if (darInfo.notForProfit === false) {
      purposesList.push(new Not(new Named(NON_PROFIT)));
    }

    //
    //    Compose all restrictions into an And one ...
    //
    if (purposesList.length > 0) {
      operandList.push(this.buildAndRestriction(purposesList));
    }

    return of(new And(operandList));

  }


  buildAndRestriction(ops) {
    return new And(ops);
  }

  buildOrRestriction(ops) {
    return new Or(ops);
  }

  buildORRestrictionFromClasses(diseasesList) {
    const diseases = [];
    diseasesList.forEach(disease => {
      diseases.push(new Named(disease));
    });
    return new Or(diseases);
  }

  translateDul(dulInfoTxt): Observable<any> {

    const dulInfo = JSON.parse(dulInfoTxt);
    console.log(JSON.stringify(dulInfo, null, 2));

    const categoryRestrictions = [];
    let restriction: UseRestriction;

    // Self explanatory
    if (dulInfo.diseaseRestrictions !== undefined && dulInfo.diseaseRestrictions.length > 0) {
      categoryRestrictions.push(this.buildORRestrictionFromClasses(dulInfo.diseaseRestrictions));
    }

    // Self explanatory
    if (dulInfo.populationRestrictions && dulInfo.populationRestrictions.length > 0) {
      categoryRestrictions.push(this.buildORRestrictionFromClasses(dulInfo.populationRestrictions));
    }

    // FALSE: Future commercial use is prohibited
    if (dulInfo.notForProfit === false) {
      categoryRestrictions.push(new Not(new Named(NON_PROFIT)));
    }

    // HMB TRUE: Data is limited to HMB (NOT POA)
    if (dulInfo.hmbResearch === true) {
      categoryRestrictions.push(new Named(HEALTH_MEDICAL_BIOMEDICAL));
    }

    // POA FALSE: Data is limited to POA (Not Prohibited)
    if (dulInfo.populationOriginsAncestry === false) {
      categoryRestrictions.push(new Not(new Named(POPULATION_ORIGINS)));
    }

    // Gender/Pediatric checks.
    if (dulInfo.gender && dulInfo.pediatric === true) {
      if (dulInfo.gender === 'male') {
        categoryRestrictions.push(new Named(BOYS));
      } else if (dulInfo.gender === 'female') {
        categoryRestrictions.push(new Named(GIRLS));
      }
    } else if (dulInfo.gender) {
      if (dulInfo.gender === 'male') {
        categoryRestrictions.push(new Named(MALE));
      } else if (dulInfo.gender === 'female') {
        categoryRestrictions.push(new Named(FEMALE));
      }
    } else if (dulInfo.pediatric === true) {
      categoryRestrictions.push(new Named(PEDIATRIC));
    }

    // GAWB-3210: In the case where GRU is sent in combination with other sub-conditions,
    // ignore GRU and apply those other restrictions instead.
    if (dulInfo.generalUse === true
      && categoryRestrictions.length === 0
      && !dulInfo.methodsResearch 
      && !dulInfo.controlSetOption) {
      return of(new Everything());
    }

    // This builds up the basic restriction before the MR and CS are applied.
    if (categoryRestrictions.length === 0) {
      restriction = new Everything();
    } else if (categoryRestrictions.length === 1) {
      restriction = categoryRestrictions[0];
    } else {
      restriction = new And(categoryRestrictions);
    }

    // Apply Methods Research Logic
    // TRUE: Future use for methods research (analytic/software/technology development) is prohibited
    if (dulInfo.methodsResearch === true) {
      restriction = new Or([new Named(METHODS_RESEARCH), restriction]);
    }

    // Apply Control Set Logic
    if (dulInfo.controlSetOption === false) {
      restriction = new Or([restriction, new And([restriction, new Not(new Named(CONTROL))])]
      );
    }

    return of(restriction);
  }

}
