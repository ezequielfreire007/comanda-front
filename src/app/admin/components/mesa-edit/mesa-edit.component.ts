import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MesaService } from 'src/app/core/services/mesa/mesa.service';

@Component({
  selector: 'app-mesa-edit',
  templateUrl: './mesa-edit.component.html',
  styleUrls: ['./mesa-edit.component.scss']
})
export class MesaEditComponent implements OnInit {

  form: FormGroup;
  id: string;

  // tiposEmpleado: TipoEmpleado[] = [];
  selected: number;
  selectedValue: number;

  constructor(
    private formBuilder: FormBuilder,
    private mesaService: MesaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Toma el parametro id de la ruta y trae a ese empleado
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.id = params.id;
      // this.empleadoService.getEmpleado(this.id).subscribe( (empleado: Empleado) => {
      //   this.form.patchValue(empleado);
      // });
    });
  }

  saveMesa(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const empleado = this.form.value;
      // this.empleadoService.updateEmpleado(this.id, empleado)
      //   .subscribe( updateEmpleado => {
      //     console.log(updateEmpleado);
      //     this.router.navigate(['./admin/mesas']);
      //   });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      codigo_mesa: ['', [Validators.required]],
      id_estado_mesa: ['', [Validators.required]],
      descripcion_estado_mesa: ['', [Validators.required]],
      foto_mesa: [''],
    });
  }

}
