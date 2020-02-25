import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { Pedido } from '../../../core/models/pedido';
import { MatTableDataSource, MatTable } from '@angular/material';
import { Empleado } from '../../../core/models/empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {

  @ViewChild('pedidoTable', {static: false}) table: MatTable<Pedido>;
  pedidos: Pedido[] = [];
  empleado: Empleado;

  displayedColumns: string[] = [
        'id_pedidos',
        'codigo_pedido',
        'descripcion_estado',
        'fecha_pedido',
        'hora_inicio_pedido',
        'hora_estimada_entrega_pedido',
        'nombre_menu',
        'actions'
  ];

  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) {
    this.empleado = JSON.parse(localStorage.getItem('empleado'));
    if (!this.empleado) {
      this.router.navigate(['/mesa']);
    }
  }

  ngOnInit() {
    // this.fetchPedidos();
    this.fetchPedidosFecha();
  }

  fetchPedidos() {
    this.pedidoService.getAllPedido().subscribe(pedidos => {
      console.log(pedidos);
      this.pedidos = pedidos;
    });
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
    console.log(pedido);
    this.pedidoService.updatePedido(pedido.id_pedidos, pedido).subscribe(updatePedido => {
      console.log(updatePedido);
    });

    // this.fetchPedidosFecha();
  }

  pedidoListo() {

  }

}
