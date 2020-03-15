import { TestBed } from '@angular/core/testing';

import { TipoEmpleadoService } from './tipo-empleado.service';

describe('TipoEmpleadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoEmpleadoService = TestBed.get(TipoEmpleadoService);
    expect(service).toBeTruthy();
  });
});
