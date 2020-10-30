import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecompensaComponent } from './recompensa.component';

describe('RecompensaComponent', () => {
  let component: RecompensaComponent;
  let fixture: ComponentFixture<RecompensaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecompensaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecompensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
