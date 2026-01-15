import { TestBed } from '@angular/core/testing';

import { GoogleApi } from './google-api';

describe('GoogleApi', () => {
  let service: GoogleApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
