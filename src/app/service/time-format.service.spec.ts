import { TestBed } from '@angular/core/testing';

import { TimeFormatService } from './time-format.service';

describe('TimeFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeFormatService = TestBed.get(TimeFormatService);
    expect(service).toBeTruthy();
  });
});
