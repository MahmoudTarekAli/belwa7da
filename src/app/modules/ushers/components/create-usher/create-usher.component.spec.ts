import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsherComponent } from './create-usher.component';

describe('CreateUsherComponent', () => {
  let component: CreateUsherComponent;
  let fixture: ComponentFixture<CreateUsherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUsherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
