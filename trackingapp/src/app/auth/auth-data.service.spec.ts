import { async, TestBed } from '@angular/core/testing';

import { AuthDataService } from './auth-data.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthDataService', () => {
  let service: AuthDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
