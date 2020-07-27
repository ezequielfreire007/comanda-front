import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { Pedido } from '../../../core/models/pedido';
import { MatTableDataSource, MatTable } from '@angular/material';
import { Empleado } from '../../../core/models/empleado';
import { Router } from '@angular/router';
import { MesaService } from '../../../core/services/mesa/mesa.service';
import { Mesa } from '../../../core/models/mesa';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {

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
        'precio_menu',
        'actions'
  ];

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private mesaService: MesaService
  ) {
    this.empleado =  this.helper.decodeToken(localStorage.getItem('token')).empleado;
    console.log(this.empleado);
  }

  ngOnInit() {
    // this.fetchPedidos();
    this.fetchPedidosFecha();
  }

  fetchPedidosFecha() {
    const date = new Date().toISOString().slice(0, 10);
    const dateSearch = {
      fecha_serch: date,
      id_empleado: this.empleado.id_empleado,
      id_tipo: this.empleado.id_tipo
    };
    console.log(dateSearch);
    this.pedidoService.getPedidoFecha(dateSearch).subscribe(pedidos => {
      console.log(pedidos);
      this.pedidos = pedidos;
    });
  }

  tomarPedido(pedido: Pedido) {
    pedido.id_estado = 2; // preparandose
    this.updatePedido(pedido.id_pedidos, pedido);
  }

  entregarPedido(pedido: Pedido) {
    pedido.id_estado = 5; // finaliza
    pedido.id_tipo_menu = 5; // -> se pasa a socio
    this.updateEstadoMesa(2, pedido); // actualizo el estado de la mesa (comiendo)
    this.updatePedido(pedido.id_pedidos, pedido);
  }

  pedidoListo(pedido: Pedido) {
    pedido.id_estado = 3; // servir
    pedido.id_tipo_menu = 4; // -> se pasa al mozo

    this.updatePedido(pedido.id_pedidos, pedido);
  }


  updateEstadoMesa(id: number, pedido: Pedido) {
    const updateMesa: Partial<Mesa> = {
      id_estado_mesa: id,
    };
    this.mesaService.updateMesa(pedido.id_mesa, updateMesa).subscribe(mesa => {
      console.log(mesa);
    });
  }

  updatePedido(id: number, pedido: Pedido) {
    this.pedidoService.updatePedido(pedido.id_pedidos, pedido).subscribe(updatePedido => {
      console.log(updatePedido);
      this.fetchPedidosFecha();
    });
  }

}
