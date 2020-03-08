import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private jwt: JwtHelperService
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url: string = state.url;
      const roles = next.data['roles'] as Array<string>;
      return this.checkLogin(url, roles);
  }


  // ORIGINAL
  checkLogin(url: string, roles: Array<string>): boolean {
    const token = localStorage.getItem('token');
    const tokenData = this.jwt.decodeToken(token);
    let check = false;

    if (tokenData) {
      const tipoUsuario = tokenData['tipo'];
      roles.forEach(element => {
        if (tipoUsuario === element) {
          check = true;
        }
      });
    } else {
      this.auth.logoutEmpleado();
      this.router.navigate(['auth/login']);
    }

    return check;
  }
}
