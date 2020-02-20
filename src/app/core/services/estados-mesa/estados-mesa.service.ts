import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EstadosMesa } from '../../models/estados-mesa';

import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EstadosMesaService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEstadosMesa() {
    return this.http.get<EstadosMesa[]>(`${environment.url_api}/estado-mesa-orm/`);
  }

  getEstadoMesa(id: string) {
    return this.http.get(`${environment.url_api}/mesa-orm/${id}`);
  }
}
