import {UseRestriction} from './userestriction';

export class Named implements UseRestriction {
    public type: string = "named";
    public name: string;
    
    constructor(name: string) {
        this.name = name;
    }
}