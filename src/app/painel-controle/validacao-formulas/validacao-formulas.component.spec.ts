import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacaoFormulasComponent } from './validacao-formulas.component';

describe('ValidacaoFormulasComponent', () => {
  let component: ValidacaoFormulasComponent;
  let fixture: ComponentFixture<ValidacaoFormulasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidacaoFormulasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacaoFormulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
