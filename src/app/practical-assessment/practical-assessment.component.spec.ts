import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalAssessmentComponent } from './practical-assessment.component';

describe('PracticalAssessmentComponent', () => {
  let component: PracticalAssessmentComponent;
  let fixture: ComponentFixture<PracticalAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticalAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
