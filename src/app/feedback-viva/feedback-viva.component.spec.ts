import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackVivaComponent } from './feedback-viva.component';

describe('FeedbackVivaComponent', () => {
  let component: FeedbackVivaComponent;
  let fixture: ComponentFixture<FeedbackVivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackVivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackVivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
