import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarNivelComponent } from './cadastrar-nivel.component';

describe('CadastrarNivelComponent', () => {
  let component: CadastrarNivelComponent;
  let fixture: ComponentFixture<CadastrarNivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarNivelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
