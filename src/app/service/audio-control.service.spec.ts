import { TestBed } from '@angular/core/testing';

import { AudioControlService } from './audio-control.service';

describe('AudioControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioControlService = TestBed.get(AudioControlService);
    expect(service).toBeTruthy();
  });
});
