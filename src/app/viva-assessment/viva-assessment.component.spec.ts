import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VivaAssessmentComponent } from './viva-assessment.component';

describe('VivaAssessmentComponent', () => {
  let component: VivaAssessmentComponent;
  let fixture: ComponentFixture<VivaAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VivaAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VivaAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
