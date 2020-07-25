import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Empleado } from '../../models/empleado';
import { Fichada } from '../../models/fichada';
import { FichadaService } from '../../services/fichada/fichada.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  fichada: Fichada;

  constructor(
   // private _router: Router,
    private http: HttpClient,
    private fichadaService: FichadaService
  ) {}

  // Login del empleado
  public loginEmpleado(login: Login) {
    // const request: JSON = JSON.parse(JSON.stringify(login));
    console.log( environment.url_api );
    return this.http.post(`${environment.url_api}/empleados/login`, login);
    // return this.httpGeneric.httpPostP('empleados/login', login); // retorna el token del usuario
  }

  // Logout del empleado
  public logoutEmpleado() {
    this.fichada = JSON.parse(localStorage.getItem('fichada'));

    const horaSalida = new Date();
    const fecha = horaSalida.toISOString().slice(0, 10);
    const hora =  horaSalida.getHours().toString() + ':' +
                  horaSalida.getMinutes().toString() + ':' +
                  horaSalida.getSeconds().toString();

    const salida = {
      salida_fichada: fecha + ' ' + hora,
    };

    this.fichadaService.updateFichada(this.fichada.id_fichada, salida).subscribe(update => {
      console.log(update);
    });
    localStorage.removeItem('token');
  }

  public getToken() {
    const fichada = localStorage.getItem('fichada');
    
    return localStorage.getItem('token');
  }

  public loggedIn() {
    return !!localStorage.getItem('token');
  }
}
