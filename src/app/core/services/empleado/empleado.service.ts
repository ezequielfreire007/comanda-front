import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Empleado } from '../../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEmpleados() {
    return this.http.get<Empleado[]>('http://localhost:8080/empleado-orm/');
  }

  getEmpleado(id: string) {
    return this.http.get(`http://localhost:8080/empleado-orm/${id}`);
  }
}
