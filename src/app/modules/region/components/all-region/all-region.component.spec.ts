import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRegionComponent } from './all-region.component';

describe('AddCategoryComponent', () => {
  let component: AllRegionComponent;
  let fixture: ComponentFixture<AllRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
