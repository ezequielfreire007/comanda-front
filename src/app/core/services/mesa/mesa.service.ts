import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mesa } from '../../models/mesa';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(
    private http: HttpClient
  ) { }

  getAllMesa() {
    return this.http.get<Mesa[]>(`${environment.url_api}/mesa-orm/`);
  }

  getMesa(id: string) {
    return this.http.get(`${environment.url_api}/mesa-orm/${id}`);
  }

  // createProduct(mesa: Mesa) {
  //   return this.http.post(`${environment.url_api}/api/products`, product);
  // }

  updateMesa(id: number, changes: Partial<Mesa>) {
    return this.http.put(`${environment.url_api}/mesa-orm/mesa/${id}`, changes);
  }

  // deleteProduct(id: string) {
  //   return this.http.delete(`${environment.url_api}/api/products/${id}`);
  // }
}
