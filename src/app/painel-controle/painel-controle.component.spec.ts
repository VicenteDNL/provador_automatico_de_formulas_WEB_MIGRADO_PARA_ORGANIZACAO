import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelControleComponent } from './painel-controle.component';

describe('PainelControleComponent', () => {
  let component: PainelControleComponent;
  let fixture: ComponentFixture<PainelControleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelControleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
