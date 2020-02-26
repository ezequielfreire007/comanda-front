import { TestBed } from '@angular/core/testing';

import { FichadaService } from './fichada.service';

describe('FichadaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FichadaService = TestBed.get(FichadaService);
    expect(service).toBeTruthy();
  });
});
