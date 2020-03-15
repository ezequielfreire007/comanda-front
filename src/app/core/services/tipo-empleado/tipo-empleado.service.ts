import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TipoEmpleado } from '../../models/tipo-empleado';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpleadoService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<TipoEmpleado[]>(`${environment.url_api}/tipo-orm/`);
  }
}
