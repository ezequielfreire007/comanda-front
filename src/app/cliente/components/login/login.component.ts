import { Component, OnInit, VERSION } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
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
  showSpinner = false;
  version = VERSION.full;
  reactiveForm = new FormGroup({
    recaptchaReactive: new FormControl(null, Validators.required)
  });

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
    
  }

  login() {

    this.autgoogleService.login()
      .then( res => {
        console.log('success')
        this.showSpinner = true;
        this.dataUser(res.user.providerData[0]);
      })
      .catch( err => this.openSnackBar( err.message, 'ok'))
      .finally(() => this.hasUser());
  }

  // version = VERSION.full;

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  loginMail(event: Event) {
    if (this.form.valid) {
      this.showSpinner = true;
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

  dataUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  hasUser() {
    this.autgoogleService.hasUser().subscribe( user => {
      if ( user ) {
        this.router.navigate(['./home']);
      }
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

  empleadosLogin() {
    console.log('hola empledo');
    this.router.navigate(['./auth/login']);
  }

  // mensaje de respuesta al usuario
  openSnackBar(message: string, action: string) {
    this.showSpinner = false;
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
