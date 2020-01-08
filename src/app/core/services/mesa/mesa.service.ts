import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mesa } from '../../models/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(
    private http: HttpClient
  ) { }

  getAllMesa() {
    return this.http.get<Mesa[]>('http://localhost:8080/mesa-orm/');
  }

  getMesa(id: string) {
    return this.http.get(`http://localhost:8080/mesa-orm/${id}`);
  }
}
