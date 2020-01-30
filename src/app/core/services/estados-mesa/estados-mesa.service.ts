import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EstadosMesa } from '../../models/estados-mesa';

@Injectable({
  providedIn: 'root'
})
export class EstadosMesaService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEstadosMesa() {
    return this.http.get<EstadosMesa>('http://localhost:8080/estados-mesa-orm/');
  }

  getEstadoMesa(id: string) {
    return this.http.get(`http://localhost:8080/mesa-orm/${id}`);
  }
}
