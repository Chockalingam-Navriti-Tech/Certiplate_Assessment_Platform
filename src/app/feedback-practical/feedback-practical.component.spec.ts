import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackPracticalComponent } from './feedback-practical.component';

describe('FeedbackPracticalComponent', () => {
  let component: FeedbackPracticalComponent;
  let fixture: ComponentFixture<FeedbackPracticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackPracticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackPracticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
