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
    console.log(`ingresa a login empleado`);
    // const request: JSON = JSON.parse(JSON.stringify(login));
    return this.http.post('http://localhost:8080/empleados/login', login);
    // return this.httpGeneric.httpPostP('empleados/login', login); // retorna el token del usuario
  }

  // Logout del empleado
  public logoutEmpleado() {
    console.log(`elimino token`);
    localStorage.removeItem('token');
  }

  public getToken() {
    console.log(`get token`);
    return localStorage.getItem('token');
  }

  public loggedIn() {
    console.log(`tiene token`);
    return !!localStorage.getItem('token');
  }
}
