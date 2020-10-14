import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicLiveComponent } from './logic-live.component';

describe('LogicLiveComponent', () => {
  let component: LogicLiveComponent;
  let fixture: ComponentFixture<LogicLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
