import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) { }

  getMenus() {
    return this.http.get('http://localhost:8080/menu-orm/');
  }

  getMenu(id: string) {
    return this.http.get(`http://localhost:8080/menu-orm/${id}`);
  }
}
