import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalInstructionsComponent } from './practical-instructions.component';

describe('PracticalInstructionsComponent', () => {
  let component: PracticalInstructionsComponent;
  let fixture: ComponentFixture<PracticalInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticalInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
