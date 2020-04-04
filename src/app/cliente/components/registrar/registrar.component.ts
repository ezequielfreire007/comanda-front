import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../../core/models/login';
import { AuthfireService } from '../../../core/services/authfire/authfire.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  login: Login;
  form: FormGroup;

  constructor(
    private router: Router,
    private authfireService: AuthfireService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit() {
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
    this.router.navigate(['./cliente']);
  }

  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./cliente']);
  }

  // validacion del formulario
  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}
