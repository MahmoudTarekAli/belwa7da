import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyCodeComponent } from './verfiy-code.component';

describe('VerfiyCodeComponent', () => {
  let component: VerfiyCodeComponent;
  let fixture: ComponentFixture<VerfiyCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerfiyCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerfiyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
