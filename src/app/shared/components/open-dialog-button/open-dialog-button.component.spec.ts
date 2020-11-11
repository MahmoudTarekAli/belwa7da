import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDialogButtonComponent } from './open-dialog-button.component';

describe('OpenDialogButtonComponent', () => {
  let component: OpenDialogButtonComponent;
  let fixture: ComponentFixture<OpenDialogButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDialogButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDialogButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
