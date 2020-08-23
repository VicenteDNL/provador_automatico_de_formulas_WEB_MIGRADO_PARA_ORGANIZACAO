import { TestBed } from '@angular/core/testing';

import { NiveisService } from './niveis.service';

describe('NiveisService', () => {
  let service: NiveisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiveisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
