import { TestBed } from '@angular/core/testing';
import { HttpProductsService } from './products.service';

describe('HttpProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpProductsService = TestBed.get(HttpProductsService);
    expect(service).toBeTruthy();
  });
});
