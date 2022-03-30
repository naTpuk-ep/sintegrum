import { TestBed } from '@angular/core/testing';

import { FilmsHttpService } from './films-http.service';

describe('ContentService', () => {
  let service: FilmsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
