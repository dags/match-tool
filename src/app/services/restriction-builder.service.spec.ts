import { TestBed, inject } from '@angular/core/testing';

import { RestrictionBuilderService } from './restriction-builder.service';

describe('RestrictionBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestrictionBuilderService]
    });
  });

  it('should be created', inject([RestrictionBuilderService], (service: RestrictionBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
