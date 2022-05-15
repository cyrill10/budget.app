import { TestBed } from '@angular/core/testing';

import { ClosingProcessService } from './closing-process.service';

describe('ClosingProcessService', () => {
  let service: ClosingProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosingProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
