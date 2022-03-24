import { TestBed } from '@angular/core/testing';

import { LocalStorageTokenService } from './local-storage-token.service';

describe('LocalStorageService', () => {
  let service: LocalStorageTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
