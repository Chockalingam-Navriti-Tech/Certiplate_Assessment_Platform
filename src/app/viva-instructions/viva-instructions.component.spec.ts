import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VivaInstructionsComponent } from './viva-instructions.component';

describe('VivaInstructionsComponent', () => {
  let component: VivaInstructionsComponent;
  let fixture: ComponentFixture<VivaInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VivaInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VivaInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
