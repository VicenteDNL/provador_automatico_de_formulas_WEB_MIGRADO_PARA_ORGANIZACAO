import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaGramaticaComponent } from './tabela-gramatica.component';

describe('TabelaGramaticaComponent', () => {
  let component: TabelaGramaticaComponent;
  let fixture: ComponentFixture<TabelaGramaticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaGramaticaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaGramaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
