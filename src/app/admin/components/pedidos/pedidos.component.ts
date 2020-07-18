import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { Empleado } from 'src/app/core/models/empleado';
import { MatTableDataSource, MatTable } from '@angular/material';
import { Pedido } from 'src/app/core/models/pedido';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  @ViewChild('pedidoTable', {static: false}) table: MatTable<Pedido>;
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
}
