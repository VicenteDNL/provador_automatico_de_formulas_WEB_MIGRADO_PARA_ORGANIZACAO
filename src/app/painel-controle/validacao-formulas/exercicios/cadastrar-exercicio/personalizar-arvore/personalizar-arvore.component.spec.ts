import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizarArvoreComponent } from './personalizar-arvore.component';

describe('PersonalizarArvoreComponent', () => {
  let component: PersonalizarArvoreComponent;
  let fixture: ComponentFixture<PersonalizarArvoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizarArvoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizarArvoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
