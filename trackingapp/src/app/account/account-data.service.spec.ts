import { TestBed } from '@angular/core/testing';

import { AccountDataService } from './account-data.service';

describe('AccountDataService', () => {
  let service: AccountDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
