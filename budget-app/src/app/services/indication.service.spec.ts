import { TestBed } from '@angular/core/testing';

import { IndicationService } from './indication.service';

describe('IndicationService', () => {
  let service: IndicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
