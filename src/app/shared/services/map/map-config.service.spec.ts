import { TestBed } from '@angular/core/testing';

import { MapConfigService } from './map-config.service';

describe('MapConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapConfigService = TestBed.get(MapConfigService);
    expect(service).toBeTruthy();
  });
});
