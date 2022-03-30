import { TestBed } from '@angular/core/testing';

import { JwtCodecService } from './jwt-codec.service';

describe('JwtCodecService', () => {
  let service: JwtCodecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtCodecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
