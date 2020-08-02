import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../../core/models/login';
import { AuthfireService } from '../../../core/services/authfire/authfire.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  login: Login;
  form: FormGroup;
  version = VERSION.full;
  reactiveForm = new FormGroup({
    recaptchaReactive: new FormControl(null, Validators.required)
  });

  constructor(
    private router: Router,
    private authfireService: AuthfireService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  registrar(event: Event) {
    console.log('registrar');
    if (this.form.valid) {
      const dataLogin: Login = {
        nombre_empleado : `${this.form.get('nombre').value}`,
        clave_empleado: `${this.form.get('password').value}`
      };
      this.authfireService.createUser(dataLogin.nombre_empleado, dataLogin.clave_empleado)
        .then( user => console.log(user))
        .catch( error => console.log(error));
    }
    this.router.navigate(['./']);
  }

  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./home']);
  }

  // validacion del formulario
  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}
