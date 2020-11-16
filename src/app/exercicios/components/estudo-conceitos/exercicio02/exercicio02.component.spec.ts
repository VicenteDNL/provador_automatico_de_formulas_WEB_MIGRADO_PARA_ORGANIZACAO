import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercicio02Component } from './exercicio02.component';

describe('Exercicio02Component', () => {
  let component: Exercicio02Component;
  let fixture: ComponentFixture<Exercicio02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercicio02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercicio02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
