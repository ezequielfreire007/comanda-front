import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutgoogleService } from '../../../core/services/authgoogle/authgoogle.service';
import { User } from '../../../core/models/userSocial';
import { Login } from '../../../core/models/login';
import { Router } from '@angular/router';
import { AuthfireService } from '../../../core/services/authfire/authfire.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userSocial: User;
  uerLogin: Login;
  form: FormGroup;

  constructor(
    private autgoogleService: AutgoogleService,
    private authfireService: AuthfireService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
   }

  ngOnInit() {
    // console.log(this.userSocial);
    // if (this.userSocial) {
    //   this.router.navigate(['./cliente/login']);
    // }
  }

  login() {
    this.autgoogleService.login()
      .then( res => console.log('success'))
      .catch( err => this.openSnackBar( err.message, 'ok'));

    this.hasUser();
  }

  loginMail(event: Event) {
    if (this.form.valid) {
      const dataLogin: Login = {
        nombre_empleado : `${this.form.get('nombre').value}`,
        clave_empleado: `${this.form.get('password').value}`
      };
      this.authfireService.login(dataLogin.nombre_empleado, dataLogin.clave_empleado)
        .then( res => {
          this.userSocial = res.user.providerData[0];
          localStorage.setItem('user', JSON.stringify(this.userSocial));
          this.router.navigate(['./home']);
        })
        .catch( error => {
          this.openSnackBar(error.message, 'ok');
        });
    }
  }

  logout() {
    this.autgoogleService.logout()
      .then( res => console.log('successfully logout'))
      .catch( err => console.log(err)
    );
  }

  hasUser() {
    this.autgoogleService.hasUser().subscribe( user => {
      // Guardo los datos necesarios del usuario
      this.userSocial = user.providerData[0];
      localStorage.setItem('user', JSON.stringify(this.userSocial));
      this.router.navigate(['./home']);
    });
  }

  registrar() {
    this.router.navigate(['./registrar']);
  }

  // validacion del formulario
  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // mensaje de respuesta al usuario
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
