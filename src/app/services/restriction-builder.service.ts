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

/* Population Structure is a subclass of DUO Primary Category*/
const DUO_PRIMARY_CATEGORY = 'http://purl.obolibrary.org/obo/DUO_0000002';
const POPULATION_STRUCTURE = 'http://purl.obolibrary.org/obo/DUO_0000011';

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
    if (darInfo.methodsResearch === true) {
      methodsList.push(new Named(METHODS_RESEARCH));
    } else {
      methodsList.push(new Not(new Named(METHODS_RESEARCH)));
    }

    if (darInfo.populationStructure === true) {
      methodsList.push(new Named(POPULATION_STRUCTURE));
    } else {
      methodsList.push(new Not(new Named(POPULATION_STRUCTURE)));
    }

    if (darInfo.controlSetOption === true) {
      methodsList.push(new Named(CONTROL));
    } else {
      methodsList.push(new Not(new Named(CONTROL)));
    }

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
    } else {
      purposesList.push(new Named(NON_PROFIT));
    }

    //
    //    Compose all restrictions into an And one ...
    //
    if (purposesList.length > 0) {
      operandList.push(this.buildAndRestriction(purposesList));
    }

    return of(new And(operandList));

  }

  // translateDul(dulInfoTxt): Observable<any> {
  //   // return of({ modo: 'everything dul' });

  //   const dulInfo = JSON.parse(dulInfoTxt);
  //   console.log(JSON.stringify(dulInfo, null, 2));

  //   const categoryRestrictions: UseRestriction[] = [];
  //   const useRestriction = {};
  //   let restriction: UseRestriction;

  //   // Self explanatory
  //   // if (!dulInfo.getDiseaseRestrictions().isEmpty()) {
  //   //     categoryRestrictions.add(
  //   //         buildORRestrictionFromClasses(dulInfo.getDiseaseRestrictions())
  //   //     );
  //   // }

  //   // Self explanatory
  //   // if (!dulInfo.getPopulationRestrictions().isEmpty()) {
  //   //     categoryRestrictions.add(
  //   //         buildORRestrictionFromClasses(dulInfo.getPopulationRestrictions())
  //   //     );
  //   // }

  //   // FALSE: Future commercial use is prohibited getOrElseFalse

  //   const notForProfit = new Not(new Named(NON_PROFIT));
  //   // console.log('notForProfit', JSON.stringify(notForProfit, null, 2));


  //   if (dulInfo.notForProfit === false) {
  //     categoryRestrictions.push(new Not(new Named(NON_PROFIT)));
  //   }
  //   // else {
  //   //   categoryRestrictions.push(new Named(NON_PROFIT));
  //   // }

  //   if (dulInfo.gender === 'Male' && dulInfo.pediatric === true) {
  //     console.log('-------------------BOYS-----------------------------');
  //     categoryRestrictions.push(new Named(BOYS));
  //   } else if (dulInfo.gender === 'Female' && dulInfo.pediatric === true) {
  //     console.log('-------------------GIRLS-----------------------------');
  //     categoryRestrictions.push(new Named(GIRLS));
  //   } else if (dulInfo.gender === 'Male' && dulInfo.pediatric === false) {
  //     console.log('-------------------MALE-----------------------------');
  //     categoryRestrictions.push(new Named(MALE));
  //   } if (dulInfo.gender === 'Female' && dulInfo.pediatric === false) {
  //     console.log('-------------------FEMALE-----------------------------');
  //     categoryRestrictions.push(new Named(FEMALE));
  //   } if (dulInfo.gender === 'NA' && dulInfo.pediatric === true) {
  //     console.log('-------------------PEDIATRIC-----------------------------');
  //     categoryRestrictions.push(new Named(PEDIATRIC));
  //   }

  //   // // GAWB-3210: In the case where GRU is sent in combination with other sub-conditions,
  //   // // ignore GRU and apply those other restrictions instead.
  //   if (dulInfo.generalUse && dulInfo.generalUse === true
  //     && categoryRestrictions.length === 0
  //     && !dulInfo.methodsResearch
  //     && !dulInfo.controlSetOption) {
  //     return of(new Everything());
  //   }

  //   // // This builds up the basic restriction before the MR and CS are applied.
  //   // if (categoryRestrictions.isEmpty()) {
  //   //   restriction = new Everything();
  //   // } else if (categoryRestrictions.size() == 1) {
  //   //   restriction = categoryRestrictions.get(0);
  //   // } else {

  //   restriction = new And(categoryRestrictions);
  //   // }

  //   // // Apply Methods Research Logic
  //   // // TRUE: Future use for methods research (analytic/software/technology development) is prohibited
  //   // getOrElseTrue
  //   if (dulInfo.methodsResearch === true) {
  //     restriction = new Or([new Named(METHODS_RESEARCH), restriction]);
  //   } else {
  //     restriction = new Or([new And([restriction, new Not(new Named(METHODS_RESEARCH))]), restriction]);
  //   }

  //   // // Apply Control Set Logic
  //   // if (isPresent(dulInfo.getControlSetOption()) && dulInfo.getControlSetOption().equalsIgnoreCase('Yes')) {
  //   //   restriction = new Or(
  //   //     restriction,
  //   //     new And(restriction, new Named(CONTROL))
  //   //   );
  //   // }

  //   console.log('-------------------------------- categoryRestrictions ----------------------------------------');
  //   console.log(JSON.stringify(categoryRestrictions, null, 2));
  //   // restriction['dul'] = categoryRestrictions;

  //   return of(restriction);
  // }

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
    if (dulInfo.diseaseRestrictions && dulInfo.diseaseRestrictions.lenght > 0) {
      categoryRestrictions.push(this.buildORRestrictionFromClasses(dulInfo.diseaseRestrictions));
    }

    // Self explanatory
    if (dulInfo.populationRestrictions && dulInfo.populationRestrictions.lenght > 0) {
      categoryRestrictions.push(this.buildORRestrictionFromClasses(dulInfo.populationRestrictions));
    }

    // FALSE: Future commercial use is prohibited
    if (dulInfo.notForProfit === false) {
      categoryRestrictions.push(new Not(new Named(NON_PROFIT)));
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
    if (dulInfo.generalUse && dulInfo.generalUse === true
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
    if (dulInfo.methodsResearch) {
      restriction = new Or([new Named(METHODS_RESEARCH), restriction]);
    } else {
      restriction = new Or([new And([restriction, new Not(new Named(METHODS_RESEARCH))]), restriction]);
    }

    // Apply Control Set Logic
    if (dulInfo.controlSetOption && dulInfo.controlSetOption === true) {
      restriction = new Or([restriction, new And([restriction, new Named(CONTROL)])]
      );
    }

    return of(restriction);
  }

}
