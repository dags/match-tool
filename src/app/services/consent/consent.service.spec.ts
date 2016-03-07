import {ConsentService} from './consent.service';

describe('ConsentService', () => {
    it('must not be null', () => {
        expect(new ConsentService(null)).not.toBe(null);
    });
});
