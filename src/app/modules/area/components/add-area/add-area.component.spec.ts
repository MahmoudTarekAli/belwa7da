import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAreaComponent } from './add-area.component';

describe('AddCategoryComponent', () => {
  let component: AddAreaComponent;
  let fixture: ComponentFixture<AddAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
