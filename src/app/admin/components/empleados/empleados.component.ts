import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadoService } from '../../../core/services/empleado/empleado.service';
import { Empleado } from '../../../core/models/empleado';
import { MatTableDataSource, MatTable } from '@angular/material';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  @ViewChild('producTable', {static: false}) table: MatTable<Empleado>;
  empleados: Empleado[] = [];
  displayedColumns: string[] = [
    'id_empleado',
    'nombre_empleado',
    'descripcion_tipo',
    'estado_empleado',
    'updated_at',
    'actions'
  ];

  constructor(
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit() {
    this.fetchAll();
  }

  fetchAll() {
    this.empleadoService.getAllEmpleadosAdmin().subscribe( empleados => {
      console.log(empleados);
      this.empleados = empleados;
    });
  }

}
