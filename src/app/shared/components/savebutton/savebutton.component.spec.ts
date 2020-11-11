import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavebuttonComponent } from './savebutton.component';

describe('SavebuttonComponent', () => {
  let component: SavebuttonComponent;
  let fixture: ComponentFixture<SavebuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavebuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
