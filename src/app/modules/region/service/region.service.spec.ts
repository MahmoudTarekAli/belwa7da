import { TestBed } from '@angular/core/testing';

import { RegionService } from './region.service';

describe('CategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegionService = TestBed.get(RegionService);
    expect(service).toBeTruthy();
  });
});
