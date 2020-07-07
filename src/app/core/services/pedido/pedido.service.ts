import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pedido } from '../../models/pedido';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPedido() {
    return this.http.get<Pedido[]>(`${environment.url_api}/pedido-orm/`);
  }

  getPedidoFecha(data: object) {
    return this.http.post<Pedido[]>(`${environment.url_api}/pedido-orm/pedido/fecha`, data);
  }

  getPedidoFechaMesa(data: object) {
    return this.http.post<Pedido[]>(`${environment.url_api}/pedido-orm/pedido/fecha-mesa`, data);
  }

  getPedido(id: string) {
    return this.http.get(`${environment.url_api}/pedido-orm/pedido/${id}`);
  }

  createPedido(pedido: Pedido) {
    return this.http.post(`${environment.url_api}/pedido-orm/pedido/add`, pedido);
  }

  updatePedido(id: number, changes: Partial<Pedido>) {
    return this.http.put(`${environment.url_api}/pedido-orm/pedido/${id}`, changes);
  }

  deletePedido(id: string) {
    return this.http.delete(`${environment.url_api}/pedido-orm/pedido/delete/${id}`);
  }
}
