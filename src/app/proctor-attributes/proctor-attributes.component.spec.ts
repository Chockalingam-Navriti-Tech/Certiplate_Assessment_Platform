import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorAttributesComponent } from './proctor-attributes.component';

describe('ProctorAttributesComponent', () => {
  let component: ProctorAttributesComponent;
  let fixture: ComponentFixture<ProctorAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProctorAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProctorAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
