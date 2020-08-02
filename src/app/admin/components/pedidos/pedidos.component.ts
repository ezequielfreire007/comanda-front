import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { Empleado } from 'src/app/core/models/empleado';
import { MatTableDataSource, MatTable } from '@angular/material';
import { Pedido } from 'src/app/core/models/pedido';

import { JwtHelperService } from '@auth0/angular-jwt';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  @ViewChild('pedidoTable', {static: false}) table: MatTable<Pedido>;
  @ViewChild('htmlData', {static: false}) htmlData: ElementRef;

  pedidos: Pedido[] = [];
  empleado: Empleado;
  helper = new JwtHelperService();

  displayedColumns: string[] = [
    'id_pedidos',
    'codigo_pedido',
    'descripcion_estado',
    'fecha_pedido',
    'hora_inicio_pedido',
    'hora_estimada_entrega_pedido',
    'nombre_menu',
    'precio_menu'
  ];

  constructor(
    private pedidoService: PedidoService
  ) {
    this.empleado =  this.helper.decodeToken(localStorage.getItem('token')).empleado;
  }

  ngOnInit() {
    this.fetchPedidos();
  }

  fetchPedidos() {
    const date = new Date().toISOString().slice(0, 10);
    const dateSearch = {
      fecha_serch: date,
      id_empleado: this.empleado.id_empleado,
      id_tipo: this.empleado.id_tipo
    };
    this.pedidoService.getPedidoFecha(dateSearch).subscribe(pedidos => {
      console.log(pedidos);
      this.pedidos = pedidos;
    });
  }

  openPDF() {
    const DATA = this.htmlData.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4' );
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
      'width': 250,
      'elementHandlers': handleElement
    });

    doc.save('pedidos.pdf');
  }
}
