import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAreaComponent } from './update-area.component';

describe('UpdateCategoryComponent', () => {
  let component: UpdateAreaComponent;
  let fixture: ComponentFixture<UpdateAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
