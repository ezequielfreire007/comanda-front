import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../core/services/empleado/empleado.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { TipoEmpleadoService } from 'src/app/core/services/tipo-empleado/tipo-empleado.service';
import { Estado } from '../../../core/models/estado-empleado';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TipoEmpleado } from 'src/app/core/models/tipo-empleado';
import { Empleado } from 'src/app/core/models/empleado';



@Component({
  selector: 'app-empleado-create',
  templateUrl: './empleado-create.component.html',
  styleUrls: ['./empleado-create.component.scss']
})
export class EmpleadoCreateComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  tiposEmpleado: TipoEmpleado[] = [];

  estados: Estado [] = [
    { value: 1, descripcion: 'activo'},
    { value: 0, descripcion: 'inactivo'},
  ];


  constructor(
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router,
    private storage: AngularFireStorage,
    private tipoEmpleadoService: TipoEmpleadoService
  ) {
    this.buildForm();
  }

  ngOnInit() {
     // Trae los tipos de empleado
     this.tipoEmpleadoService.getAll().subscribe(tipos => {
      this.tiposEmpleado = tipos;
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const empleado: Empleado = this.form.value;
      this.empleadoService.createEmpleado(empleado).subscribe( newEmpleado => {
        console.log(newEmpleado);
        this.buildForm();
        this.router.navigate(['./admin/empleados']);
      });
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = file.name;
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.form.get('foto_empleado').setValue(url);
        });
      })
    )
    .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre_empleado: ['', [Validators.required]],
      id_tipo: ['', [Validators.required]],
      foto_empleado: [''],
      estado_empleado: ['', [Validators.required]],
    });
  }

  // get priceField() {
  //   return this.form.get('price');
  // }

}
