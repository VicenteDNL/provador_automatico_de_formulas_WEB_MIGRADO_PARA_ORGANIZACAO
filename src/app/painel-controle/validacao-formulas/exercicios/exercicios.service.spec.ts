import { TestBed } from '@angular/core/testing';

import { ExerciciosService } from './exercicios.service';

describe('ExerciciosService', () => {
  let service: ExerciciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
