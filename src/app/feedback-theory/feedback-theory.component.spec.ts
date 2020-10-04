import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackTheoryComponent } from './feedback-theory.component';

describe('FeedbackTheoryComponent', () => {
  let component: FeedbackTheoryComponent;
  let fixture: ComponentFixture<FeedbackTheoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackTheoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackTheoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
