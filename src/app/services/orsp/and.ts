import {UseRestriction} from './userestriction';

export class And implements UseRestriction {
    type: string = "and";
    operands: UseRestriction[];
    
    constructor(operands: UseRestriction[]) {
        this.operands = operands;
    }
}