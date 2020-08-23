import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarExercicioComponent } from './pesquisar-exercicio.component';

describe('PesquisarExercicioComponent', () => {
  let component: PesquisarExercicioComponent;
  let fixture: ComponentFixture<PesquisarExercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarExercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarExercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
