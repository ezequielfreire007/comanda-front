import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Menu } from '../../models/menu';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) { }

  getAllMenus() {
    return this.http.get<Menu[]>(`${environment.url_api}/menu-orm/`);
  }

  getMenu(id: string) {
    return this.http.get(`${environment.url_api}/menu-orm/${id}`);
  }
}
