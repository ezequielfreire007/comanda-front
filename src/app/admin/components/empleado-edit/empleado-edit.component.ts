import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../core/services/empleado/empleado.service';
import { TipoEmpleadoService } from '../../../core/services/tipo-empleado/tipo-empleado.service';
import { TipoEmpleado } from '../../../core/models/tipo-empleado';
import { Empleado } from '../../../core/models/empleado';

@Component({
  selector: 'app-empleado-edit',
  templateUrl: './empleado-edit.component.html',
  styleUrls: ['./empleado-edit.component.scss']
})
export class EmpleadoEditComponent implements OnInit {

  form: FormGroup;
  id: string;

  tiposEmpleado: TipoEmpleado[] = [];
  selected: number;
  idtipo: number;
  // id_empleado?: number;
  //   nombre_empleado?: string;
  //   id_tipo?: number;
  //   descripcion_tipo?: string;
  //   clave_empleado?: string;
  //   estado_empleado?: string;
  //   foto_empleado?: string;
  //   created_at?: Date;
  //   updated_at?: Date;

  constructor(
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tipoEmpleadoService: TipoEmpleadoService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.id = params.id;
      this.empleadoService.getEmpleado(this.id).subscribe( (empleado: Empleado) => {
        console.log(empleado);
        this.idtipo = empleado.id_tipo;
        this.form.patchValue(empleado);
      });
    });

    this.tipoEmpleadoService.getAll().subscribe(tipos => {
      this.tiposEmpleado = tipos;
    });

  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const empleado = this.form.value;
      this.empleadoService.updateEmpleado(this.id, empleado)
        .subscribe( updateEmpleado => {
          console.log(updateEmpleado);
          this.router.navigate(['./admin/empleados']);
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre_empleado: ['', [Validators.required]],
      id_tipo: ['', [Validators.required]],
      foto_empleado: [''],
      estado_empleado: ['', [Validators.required]],
    });
  }

}
