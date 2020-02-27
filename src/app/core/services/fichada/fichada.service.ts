import { Injectable } from '@angular/core';
import { Fichada } from '../../models/fichada';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FichadaService {

  constructor(
    private http: HttpClient
  ) { }

  getAllFichada(data: object) {
    return this.http.post<Fichada[]>(`${environment.url_api}/fichada-orm`, data);
  }
  getFichadaFecha(data: object) {
    return this.http.post<Fichada[]>(`${environment.url_api}/fichada-orm/`, data);
  }

  getFichada(id: string) {
    return this.http.get(`${environment.url_api}/fichada-orm/fichada/${id}`);
  }

  createFichada(data: object) {
    return this.http.post(`${environment.url_api}/fichada-orm/fichada/add`, data);
  }

  updateFichada(id: number, changes: Partial<Fichada>) {
    return this.http.put(`${environment.url_api}/fichada-orm/fichada/${id}`, changes);
  }


}
