import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRegionComponent } from './update-region.component';

describe('UpdateCategoryComponent', () => {
  let component: UpdateRegionComponent;
  let fixture: ComponentFixture<UpdateRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
