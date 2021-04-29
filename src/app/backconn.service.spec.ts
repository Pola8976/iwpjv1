import { TestBed } from '@angular/core/testing';

import { BackconnService } from './backconn.service';

describe('BackconnService', () => {
  let service: BackconnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackconnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
