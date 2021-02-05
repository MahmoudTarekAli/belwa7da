import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsherDetailsComponent } from './usher-details.component';

describe('UsherDetailsComponent', () => {
  let component: UsherDetailsComponent;
  let fixture: ComponentFixture<UsherDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsherDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
