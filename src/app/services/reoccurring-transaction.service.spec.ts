import { TestBed } from '@angular/core/testing';

import { ReoccurringTransactionService } from './reoccurring-transaction.service';

describe('ReoccurringTransactionService', () => {
  let service: ReoccurringTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReoccurringTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
