import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorArvoreComponent } from './visualizador-arvore.component';

describe('VisualizadorArvoreComponent', () => {
  let component: VisualizadorArvoreComponent;
  let fixture: ComponentFixture<VisualizadorArvoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizadorArvoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizadorArvoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
