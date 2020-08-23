import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarExercicioComponent } from './cadastrar-exercicio.component';

describe('CadastrarExercicioComponent', () => {
  let component: CadastrarExercicioComponent;
  let fixture: ComponentFixture<CadastrarExercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarExercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarExercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
