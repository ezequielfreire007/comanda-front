import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmpleadoService } from '../../../core/services/empleado/empleado.service';
import { Empleado } from '../../../core/models/empleado';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTable } from '@angular/material';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  @ViewChild('producTable', {static: false}) table: MatTable<Empleado>;
  @ViewChild('htmlData', {static: false}) htmlData: ElementRef;

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
    private empleadoService: EmpleadoService,
    private router: Router
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

  deleteEmpleado(empleado: Empleado) {
    this.empleadoService.deleteEmpleado(empleado.id_empleado.toString())
      .subscribe( empleadoDelete => {
        console.log(empleadoDelete);
        this.fetchAll();
      });
  }

  openPDF() {
    const DATA = this.htmlData.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.fromHTML(DATA.innerHTML, 15, 15);
    doc.output('dataurlnewwindow');
  }

  downloadPDF() {
    const DATA = this.htmlData.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');

    const handleElement = { '#editor': function ( element, renderer) {
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML, 15, 15, {
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('empleados.pdf');
  }

}
