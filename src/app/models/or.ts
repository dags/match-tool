import { UseRestriction } from './userestriction';

export class Or implements UseRestriction {
    type = 'or';
    operands: UseRestriction[];

    constructor(operands: UseRestriction[]) {
        this.operands = operands;
    }
}
