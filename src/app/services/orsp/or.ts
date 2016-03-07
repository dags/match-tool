import {UseRestriction} from './userestriction';

export class Or implements UseRestriction {
    type: string = "or";
    operands: UseRestriction[];
    
    constructor(operands: UseRestriction[]) {
        this.operands = operands;
    }
}