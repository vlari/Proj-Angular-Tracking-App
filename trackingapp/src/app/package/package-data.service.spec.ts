import { TestBed } from '@angular/core/testing';

import { PackageDataService } from './package-data.service';

describe('PackageDataService', () => {
  let service: PackageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
