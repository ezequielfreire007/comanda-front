import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../core/services/empleado/empleado.service';

import { Empleado } from '../../../core/models/empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];

  constructor(
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit() {
    this.fetchAllEmpleados();
  }

  fetchAllEmpleados() {
    this.empleadoService.getAllEmpleados()
    .subscribe( empleados => {
      console.log(empleados);
      this.empleados = empleados;
    });
  }

}
