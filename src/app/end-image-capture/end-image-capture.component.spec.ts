import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndImageCaptureComponent } from './end-image-capture.component';

describe('EndImageCaptureComponent', () => {
  let component: EndImageCaptureComponent;
  let fixture: ComponentFixture<EndImageCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndImageCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndImageCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
