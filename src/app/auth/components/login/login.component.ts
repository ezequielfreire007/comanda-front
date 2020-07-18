import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Login } from 'src/app/core/models/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  duration = 5;
  login: Login;
  error: boolean;
  errorMessage: string;
  helper = new JwtHelperService();
  showSpinner = false;
  colorSpinner: ThemePalette = 'accent';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/pedido']);
    }
  }

  loginUser(event: Event) {
    this.error = false;
    if (this.form.valid) {
      this.showSpinner = true;
      // tslint:disable-next-line: max-line-length
      const dataLogin: Login = { nombre_empleado : `${this.form.get('nombre').value}`, clave_empleado: `${this.form.get('password').value}`};
      this.auth.loginEmpleado(dataLogin).subscribe( res => {
        if (res['estado'] === 'ok') {
          // seteo el token en local storage
          localStorage.setItem('token', res['token']);
          // decodifico el token y tomo la data para que este disponible

          // este es el token para el empleado pero capaz lo saque del login (VOLAR)
          // const decodeToken =  this.helper.decodeToken(localStorage.getItem('token'));
          // localStorage.setItem('empleado', JSON.stringify(decodeToken.empleado));

          // redireciono a pedido todos tienen acceso a este boton
          this.router.navigate(['/pedido']);
        } else {
          this.error = true;
          this.openSnackBar(res['mensaje'], 'ok');
        }
      });
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }

  // validacion del formulario
  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // ingreso rapido para probar la app
  ingreso(tipo: string) {
    switch (tipo) {
      case 'socio':
        this.form.setValue({ nombre: 'ezequiel', password: '123'});
        break;
      case 'mozo':
        this.form.setValue({ nombre: 'micaela', password: '123'});
        break;
      case 'cocinero':
        this.form.setValue({ nombre: 'mariana', password: '123'});
        break;
      case 'bartender':
        this.form.setValue({ nombre: 'jose', password: '123'});
        break;
      case 'cervecero':
        this.form.setValue({ nombre: 'pedro', password: '123'});
        break;
      default:
        break;
    }
  }

  // mensaje de respuesta al usuario
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
