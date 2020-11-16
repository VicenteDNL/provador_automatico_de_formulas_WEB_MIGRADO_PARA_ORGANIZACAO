import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercicio01Component } from './exercicio01.component';

describe('Exercicio01Component', () => {
  let component: Exercicio01Component;
  let fixture: ComponentFixture<Exercicio01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercicio01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercicio01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
