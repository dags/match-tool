import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ConsentService } from './consent.service';

describe('Consent Service', () => {
  beforeEachProviders(() => [ConsentService]);

  it('should ...',
      inject([ConsentService], (service: ConsentService) => {
    expect(service).toBeTruthy();
  }));
});
