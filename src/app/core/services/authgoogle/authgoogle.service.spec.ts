import { TestBed } from '@angular/core/testing';

import { AutgoogleService } from './authgoogle.service';

describe('AutgoogleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutgoogleService = TestBed.get(AutgoogleService);
    expect(service).toBeTruthy();
  });
});
