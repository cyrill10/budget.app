import { TestBed } from '@angular/core/testing';

import { AccountTypeService } from './accounttype.service';

describe('AccountTypeService', () => {
  let service: AccountTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
