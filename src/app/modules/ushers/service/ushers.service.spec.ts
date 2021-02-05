import { TestBed } from '@angular/core/testing';
import { HttpUshersService } from './usher.service';

describe('HttpProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpUshersService = TestBed.get(HttpUshersService);
    expect(service).toBeTruthy();
  });
});
