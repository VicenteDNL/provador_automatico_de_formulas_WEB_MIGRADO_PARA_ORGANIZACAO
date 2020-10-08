import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicioValidacaoComponent } from './exercicio-validacao.component';

describe('ExercicioValidacaoComponent', () => {
  let component: ExercicioValidacaoComponent;
  let fixture: ComponentFixture<ExercicioValidacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercicioValidacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercicioValidacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
