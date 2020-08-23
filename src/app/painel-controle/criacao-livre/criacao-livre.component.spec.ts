import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoLivreComponent } from './criacao-livre.component';

describe('CriacaoLivreComponent', () => {
  let component: CriacaoLivreComponent;
  let fixture: ComponentFixture<CriacaoLivreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriacaoLivreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriacaoLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
