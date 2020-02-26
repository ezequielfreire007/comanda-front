import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Empleado } from '../../models/empleado';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEmpleados() {
    return this.http.get<Empleado[]>(`${environment.url_api}/empleado-orm/`);
  }

  getEmpleado(id: string) {
    return this.http.get(`${environment.url_api}/empleado-orm/${id}`);
  }
}
