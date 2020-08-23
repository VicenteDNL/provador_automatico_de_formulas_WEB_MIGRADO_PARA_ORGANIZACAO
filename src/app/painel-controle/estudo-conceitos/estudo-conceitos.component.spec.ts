import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudoConceitosComponent } from './estudo-conceitos.component';

describe('EstudoConceitosComponent', () => {
  let component: EstudoConceitosComponent;
  let fixture: ComponentFixture<EstudoConceitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudoConceitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudoConceitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
