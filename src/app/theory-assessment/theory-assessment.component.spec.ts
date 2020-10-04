import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoryAssessmentComponent } from './theory-assessment.component';

describe('TheoryAssessmentComponent', () => {
  let component: TheoryAssessmentComponent;
  let fixture: ComponentFixture<TheoryAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheoryAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoryAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
