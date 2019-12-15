import { TestBed } from '@angular/core/testing';

import { KkHackService } from './kk-hack.service';

describe('KkHackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KkHackService = TestBed.get(KkHackService);
    expect(service).toBeTruthy();
  });
});
