import { TestBed } from '@angular/core/testing';

import { EstadosMesaService } from './estados-mesa.service';

describe('EstadosMesaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadosMesaService = TestBed.get(EstadosMesaService);
    expect(service).toBeTruthy();
  });
});
