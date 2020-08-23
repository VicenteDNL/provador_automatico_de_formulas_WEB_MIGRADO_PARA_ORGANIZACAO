import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveisComponent } from './niveis.component';

describe('NiveisComponent', () => {
  let component: NiveisComponent;
  let fixture: ComponentFixture<NiveisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiveisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
