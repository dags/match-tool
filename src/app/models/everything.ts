import { UseRestriction } from './userestriction';

export class Everything implements UseRestriction {
    type = 'everything';
    constructor() { }
}
