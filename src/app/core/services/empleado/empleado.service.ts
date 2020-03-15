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

  // Trae los datos del empleado para listar en administrador
  getAllEmpleadosAdmin() {
    return this.http.get<Empleado[]>(`${environment.url_api}/empleado-orm/empleado/tipo`);
  }

  getEmpleado(id: string) {
    return this.http.get(`${environment.url_api}/empleado-orm/empleado/${id}`);
  }

  createEmpleado(empleado: Empleado) {
    return this.http.post(`${environment.url_api}/empleado-orm/empleado/add`, empleado);
  }

  updateEmpleado(id: string, changes: Partial<Empleado>) {
    return this.http.put(`${environment.url_api}/empleado-orm/empleado/${id}`, changes);
  }

  deleteEmpleado(id: string) {
    return this.http.delete(`${environment.url_api}/empleado-orm/empleado/delete/${id}`);
  }
}
