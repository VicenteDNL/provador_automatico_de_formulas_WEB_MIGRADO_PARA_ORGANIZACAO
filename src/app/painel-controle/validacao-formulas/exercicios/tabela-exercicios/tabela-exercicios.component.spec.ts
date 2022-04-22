import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaExerciciosComponent } from './tabela-exercicios.component';

describe('TabelaExerciciosComponent', () => {
  let component: TabelaExerciciosComponent;
  let fixture: ComponentFixture<TabelaExerciciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaExerciciosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaExerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
