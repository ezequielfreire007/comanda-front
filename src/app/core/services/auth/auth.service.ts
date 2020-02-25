import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;

  constructor(
   // private _router: Router,
    private http: HttpClient
  ) {}

  // Login del empleado
  public loginEmpleado(login: Login) {
    // const request: JSON = JSON.parse(JSON.stringify(login));
    return this.http.post('http://localhost:8080/empleados/login', login);
    // return this.httpGeneric.httpPostP('empleados/login', login); // retorna el token del usuario
  }

  // Logout del empleado
  public logoutEmpleado() {
    localStorage.removeItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public loggedIn() {
    return !!localStorage.getItem('token');
  }
}
