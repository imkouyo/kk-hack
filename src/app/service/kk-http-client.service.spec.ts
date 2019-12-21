import { TestBed } from '@angular/core/testing';

import { KkHttpClientService } from './kk-http-client.service';

describe('KkHttpClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KkHttpClientService = TestBed.get(KkHttpClientService);
    expect(service).toBeTruthy();
  });
});
