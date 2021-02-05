import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UshersComponent } from './ushers.component';

describe('UshersComponent', () => {
  let component: UshersComponent;
  let fixture: ComponentFixture<UshersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UshersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UshersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
