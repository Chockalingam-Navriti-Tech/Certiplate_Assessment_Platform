import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoryInstructionsComponent } from './theory-instructions.component';

describe('TheoryInstructionsComponent', () => {
  let component: TheoryInstructionsComponent;
  let fixture: ComponentFixture<TheoryInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheoryInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoryInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
