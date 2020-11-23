import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorCountViewsComponent } from './proctor-count-views.component';

describe('ProctorCountViewsComponent', () => {
  let component: ProctorCountViewsComponent;
  let fixture: ComponentFixture<ProctorCountViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProctorCountViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProctorCountViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
