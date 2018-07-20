import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DebugHelper } from 'protractor/built/debugger';
import { Named } from '../models/named';
import { Not } from '../models/not';
import { And } from '../models/and';
import { UseRestriction } from '../models/userestriction';
import { Or } from '../models/or';


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

  translateDar(darInfo): Observable<any> {
    return of({ modo: 'everything dar' });
  }

  translateDul(dulInfoTxt): Observable<any> {
    // return of({ modo: 'everything dul' });

    const dulInfo = JSON.parse(dulInfoTxt);
    console.log(JSON.stringify(dulInfo, null, 2));

    const categoryRestrictions: UseRestriction[] = [];
    const useRestriction = {};
    let restriction: UseRestriction;

    // Self explanatory
    // if (!dulInfo.getDiseaseRestrictions().isEmpty()) {
    //     categoryRestrictions.add(
    //         buildORRestrictionFromClasses(dulInfo.getDiseaseRestrictions())
    //     );
    // }

    // Self explanatory
    // if (!dulInfo.getPopulationRestrictions().isEmpty()) {
    //     categoryRestrictions.add(
    //         buildORRestrictionFromClasses(dulInfo.getPopulationRestrictions())
    //     );
    // }

    // FALSE: Future commercial use is prohibited getOrElseFalse

    const notForProfit = new Not(new Named(NON_PROFIT));
    // console.log('notForProfit', JSON.stringify(notForProfit, null, 2));


    if (dulInfo.notForProfit === false) {
      categoryRestrictions.push(new Not(new Named(NON_PROFIT)));
    } else {
      categoryRestrictions.push(new Named(NON_PROFIT));
    }

    if (dulInfo.gender === 'Male' && dulInfo.pediatric === true) {
      console.log('-------------------BOYS-----------------------------');
      categoryRestrictions.push(new Named(BOYS));
    } else if (dulInfo.gender === 'Female' && dulInfo.pediatric === true) {
      console.log('-------------------GIRLS-----------------------------');
      categoryRestrictions.push(new Named(GIRLS));
    } else if (dulInfo.gender === 'Male' && dulInfo.pediatric === false) {
      console.log('-------------------MALE-----------------------------');
      categoryRestrictions.push(new Named(MALE));
    } if (dulInfo.gender === 'Female' && dulInfo.pediatric === false) {
      console.log('-------------------FEMALE-----------------------------');
      categoryRestrictions.push(new Named(FEMALE));
    } if (dulInfo.gender === 'NA' && dulInfo.pediatric === true) {
      console.log('-------------------PEDIATRIC-----------------------------');
      categoryRestrictions.push(new Named(PEDIATRIC));
    }


    // // GAWB-3210: In the case where GRU is sent in combination with other sub-conditions,
    // // ignore GRU and apply those other restrictions instead.
    // if (dulInfo.generalUse && dulInfo.getGeneralUse())
    //   && categoryRestrictions.isEmpty()
    //   && !isPresent(dulInfo.getMethodsResearch())
    //   && !isPresent(dulInfo.getControlSetOption())) {
    //   return new Everything();
    // }

    // // This builds up the basic restriction before the MR and CS are applied.
    // if (categoryRestrictions.isEmpty()) {
    //   restriction = new Everything();
    // } else if (categoryRestrictions.size() == 1) {
    //   restriction = categoryRestrictions.get(0);
    // } else {

    restriction = new And(categoryRestrictions);
    // }

    // // Apply Methods Research Logic
    // // TRUE: Future use for methods research (analytic/software/technology development) is prohibited
    // getOrElseTrue
    if (dulInfo.methodsResearch === true) {
      restriction = new Or([new Named(METHODS_RESEARCH), restriction]);
    } else {
      restriction = new Or([new And([restriction, new Not(new Named(METHODS_RESEARCH))]), restriction]);
    }

    // // Apply Control Set Logic
    // if (isPresent(dulInfo.getControlSetOption()) && dulInfo.getControlSetOption().equalsIgnoreCase('Yes')) {
    //   restriction = new Or(
    //     restriction,
    //     new And(restriction, new Named(CONTROL))
    //   );
    // }

    console.log('--------------------------------categoryRestrictions----------------------------------------');
    console.log(JSON.stringify(categoryRestrictions, null, 2));
    // restriction['dul'] = categoryRestrictions;

    return of(restriction);


  }

}


// Helper


//  * Note that aggregate research is not used to build a DUR, but there are existing consents that were created
//  * with it so we still need to test for it.
//  */
// public static final String AGGREGATE_RESEARCH = 'http://www.broadinstitute.org/ontologies/DUOS/aggregate_research';


// package org.broadinstitute.dsde.consent.ontology.datause.builder;

// import org.broadinstitute.dsde.consent.ontology.datause.models.*;
// import org.broadinstitute.dsde.consent.ontology.resources.model.DataUse;

// import java.util.ArrayList;
// import java.util.List;

// import static org.broadinstitute.dsde.consent.ontology.datause.builder.UseRestrictionBuilderSupport.*;

/**
 * Apply consent-specific business rules when generating use restrictions
 *
 * There are several consent-related Data Use conditions, but the only ones
 * that translate to a Structured Use Restriction are:
 *  - General Use
 *  - Disease Restrictions
 *  - Population Restrictions (requires manual review)
 *  - Commercial Use
 *  - Gender
 *  - Pediatric
 *  - Methods Research
 *  - Control Set
 *
 *  Other consent-related conditions include, but are currently not translated into an SDUR:
 *  - HMB - Health/Medical/Biomedical Research
 *  - POA - Population Origins Ancestry
 *  - Population Structure
 *  - Date Restriction (requires manual review)
 *  - Aggregate Research (requires manual review)
 *  - Recontacting Data Subjects
 *  - Recontacting May
 *  - Recontacting Must
 *  - Genotypic Phenotypic data
 *  - Cloud Storage
 *  - Other and Other Restrictions (requires manual review)
 *  - Ethics Approval Required
 *  - Geographical Restrictions
 *
 *  Future additions to DUOS matching logic should make use of these fields.
 *
 */


// public class ConsentRestrictionBuilder implements UseRestrictionBuilder {

//     public UseRestriction buildUseRestriction(DataUse dataUse) {
//         List<UseRestriction> categoryRestrictions = new ArrayList<>();
//         UseRestriction restriction;

//         // Self explanatory
//         if (!dataUse.getDiseaseRestrictions().isEmpty()) {
//             categoryRestrictions.add(
//                 buildORRestrictionFromClasses(dataUse.getDiseaseRestrictions())
//             );
//         }

//         // Self explanatory
//         if (!dataUse.getPopulationRestrictions().isEmpty()) {
//             categoryRestrictions.add(
//                 buildORRestrictionFromClasses(dataUse.getPopulationRestrictions())
//             );
//         }

//         // FALSE: Future commercial use is prohibited
//         if (getOrElseFalse(dataUse.getCommercialUse())) {
//             categoryRestrictions.add(new Not(new Named(NON_PROFIT)));
//         }

//         // Gender/Pediatric checks.
//         if (isPresent(dataUse.getGender()) &&
//             getOrElseFalse(dataUse.getPediatric())) {
//             if (dataUse.getGender().equalsIgnoreCase('male')) {
//                 categoryRestrictions.add(new Named(BOYS));
//             }
//             else if (dataUse.getGender().equalsIgnoreCase('female')) {
//                 categoryRestrictions.add(new Named(GIRLS));
//             }
//         } else if (isPresent(dataUse.getGender())) {
//             if (dataUse.getGender().equalsIgnoreCase('male')) {
//                 categoryRestrictions.add(new Named(MALE));
//             }
//             else if (dataUse.getGender().equalsIgnoreCase('female')) {
//                 categoryRestrictions.add(new Named(FEMALE));
//             }
//         } else if (getOrElseFalse(dataUse.getPediatric())) {
//             categoryRestrictions.add(new Named(PEDIATRIC));
//         }

//         // GAWB-3210: In the case where GRU is sent in combination with other sub-conditions,
//         // ignore GRU and apply those other restrictions instead.
//         if ((isPresent(dataUse.getGeneralUse()) && dataUse.getGeneralUse())
//                 && categoryRestrictions.isEmpty()
//                 && !isPresent(dataUse.getMethodsResearch())
//                 && !isPresent(dataUse.getControlSetOption())) {
//             return new Everything();
//         }

//         // This builds up the basic restriction before the MR and CS are applied.
//         if (categoryRestrictions.isEmpty()) {
//             restriction = new Everything();
//         } else if (categoryRestrictions.size() == 1) {
//             restriction = categoryRestrictions.get(0);
//         } else {
//             restriction = new And(categoryRestrictions.toArray(new UseRestriction[categoryRestrictions.size()]));
//         }

//         // Apply Methods Research Logic
//         // TRUE: Future use for methods research (analytic/software/technology development) is prohibited
//         if (getOrElseTrue(dataUse.getMethodsResearch())) {
//             restriction = new Or(new Named(METHODS_RESEARCH), restriction);
//         } else {
//             restriction = new Or(
//                 new And(restriction, new Not(new Named(METHODS_RESEARCH))),
//                 restriction
//             );
//         }

//         // Apply Control Set Logic
//         if (isPresent(dataUse.getControlSetOption()) && dataUse.getControlSetOption().equalsIgnoreCase('Yes')) {
//             restriction = new Or(
//                 restriction,
//                 new And(restriction, new Named(CONTROL))
//             );
//         }

//         return restriction;
//     }

// }


// package org.broadinstitute.dsde.consent.ontology.datause.builder;

// import org.apache.commons.collections4.CollectionUtils;
// import org.broadinstitute.dsde.consent.ontology.datause.models.*;
// import org.broadinstitute.dsde.consent.ontology.resources.model.DataUse;

// import java.util.ArrayList;
// import java.util.List;

// import static org.broadinstitute.dsde.consent.ontology.datause.builder.UseRestrictionBuilderSupport.*;

// /**
//  * Apply data-access-request-specific business rules when generating use restrictions
//  */
// public class DARRestrictionBuilder implements UseRestrictionBuilder {

//     public UseRestriction buildUseRestriction(DataUse dataUse) {

//         if (isPresent(dataUse.getGeneralUse()) && dataUse.getGeneralUse()) {
//             return new Everything();
//         }

//         List<UseRestriction> operandList = new ArrayList<>();

//         //
//         //    Research related entries
//         //
//         List<UseRestriction> methodsList = new ArrayList<>();
//         if (isPresent(dataUse.getMethodsResearch()) && dataUse.getMethodsResearch()) {
//             methodsList.add(new Named(METHODS_RESEARCH));
//         } else {
//             methodsList.add(new Not(new Named(METHODS_RESEARCH)));
//         }
//         if (getOrElseFalse(dataUse.getPopulationStructure())) {
//             methodsList.add(new Named(POPULATION_STRUCTURE));
//         } else {
//             methodsList.add(new Not(new Named(POPULATION_STRUCTURE)));
//         }
//         if (isPresent(dataUse.getControlSetOption()) && dataUse.getControlSetOption().equalsIgnoreCase('Yes')) {
//             methodsList.add(new Named(CONTROL));
//         } else {
//             methodsList.add(new Not(new Named(CONTROL)));
//         }

//         if (CollectionUtils.isNotEmpty(methodsList)) {
//             operandList.add(buildAndRestriction(methodsList));
//         }

//         //
//         //    Diseases related entries
//         //
//         if (!dataUse.getDiseaseRestrictions().isEmpty()) {
//             operandList.add(buildORRestrictionFromClasses(dataUse.getDiseaseRestrictions()));
//         }

//         //
//         //    gender, age and commercial status entries
//         //
//         List<UseRestriction> purposesList = new ArrayList<>();
//         if (isPresent(dataUse.getGender())) {
//             if (dataUse.getGender().equalsIgnoreCase('male')) {
//                 purposesList.add(new Named(MALE));
//             } else if (dataUse.getGender().equalsIgnoreCase('female')) {
//                 purposesList.add(new Named(FEMALE));
//             }
//         }

//         if (getOrElseFalse(dataUse.getPediatric())) {
//             purposesList.add(new Named(PEDIATRIC));
//         }

//         if (getOrElseFalse(dataUse.getCommercialUse())) {
//             purposesList.add(new Not(new Named(NON_PROFIT)));
//         } else {
//             purposesList.add(new Named(NON_PROFIT));
//         }

//         //
//         //    Compose all restrictions into an And one ...
//         //
//         if (CollectionUtils.isNotEmpty(purposesList)) {
//             operandList.add(buildAndRestriction(purposesList));
//         }

//         return new And(operandList.toArray(new UseRestriction[operandList.size()]));
//     }

// }

