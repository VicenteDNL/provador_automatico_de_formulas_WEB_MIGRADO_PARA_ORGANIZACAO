import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoInvalidoComponent } from './acesso-invalido.component';

describe('AcessoInvalidoComponent', () => {
  let component: AcessoInvalidoComponent;
  let fixture: ComponentFixture<AcessoInvalidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessoInvalidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessoInvalidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
