import { UseRestriction } from './userestriction';

export class Not implements UseRestriction {
    public type = 'not';
    operand: UseRestriction;

    constructor(operand: UseRestriction) {
        this.operand = operand;
    }
}
