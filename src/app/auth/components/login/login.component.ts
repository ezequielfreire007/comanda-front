import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Login } from 'src/app/core/models/login';


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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.auth.loggedIn()) {
      console.log('usuario ya logeador direccionar a empleados');
      this.router.navigate(['/home']);
    }
  }

  loginUser(event: Event) {
    //debugger;
    this.error = false;
    if (this.form.valid) {
    const dataLogin: Login = { nombre_empleado : `${this.form.get('nombre').value}`, clave_empleado: `${this.form.get('password').value}`};
    console.log(dataLogin);
    this.auth.loginEmpleado(dataLogin).subscribe(res => {
      console.log(res);
      if (res['estado'] === 'ok') {
        console.log('el estado es ok');
        localStorage.setItem('token', res['token']);

        if (!this.auth.redirectUrl) {
          this.auth.redirectUrl = 'home';
        }
        this.router.navigate([this.auth.redirectUrl]);
      } else {
        this.error = true;
        this.openSnackBar(res['mensaje'], 'ok');
      }
    });
      // this.auth.loginEmpleado(this.login)
      //   .then(
      //     response => {
      //       console.log(response);
      //       if (response['Estado'] === 'OK') {
      //         localStorage.setItem('token', response['Token']);
      //         if (!this._auth.redirectUrl) {
      //           this._auth.redirectUrl = 'empleados';
      //         }
      //         this._router.navigate([this._auth.redirectUrl]);
      //       } else {
      //         this.error = true;
      //         this.errorMessage = response['Mensaje'];
      //       }
      //     }
      //   )
      //   .catch(
      //     response => {
      //       this.error = true;
      //       this.errorMessage = response['Mensaje'];
      //     }
      //   );
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
        console.log('login socio');
        this.form.setValue({ nombre: 'ezequiel', password: '123'});
        break;
      case 'mozo':
        console.log('login mozo');
        this.form.setValue({ nombre: 'micaela', password: '123'});
        break;
      case 'cocinero':
        console.log('login cocinero');
        this.form.setValue({ nombre: 'mariana', password: '123'});
        break;
      case 'bartender':
        console.log('login bartender');
        this.form.setValue({ nombre: 'jose', password: '123'});
        break;
      case 'cervecero':
        console.log('login cervecero');
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
