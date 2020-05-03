import { TestBed } from '@angular/core/testing';

import { NotbuiltService } from './notbuilt.service';

describe('NotbuiltService', () => {
  let service: NotbuiltService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotbuiltService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
