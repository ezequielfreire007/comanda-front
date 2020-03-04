import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { Pedido } from '../../../core/models/pedido';
import { MatTableDataSource, MatTable } from '@angular/material';
import { Empleado } from '../../../core/models/empleado';
import { Router } from '@angular/router';
import { MesaService } from '../../../core/services/mesa/mesa.service';
import { Mesa } from '../../../core/models/mesa';


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
    private router: Router,
    private mesaService: MesaService
  ) {
    this.empleado = JSON.parse(localStorage.getItem('empleado'));
    if (!this.empleado) {
      this.router.navigate(['/mesa']);
<<<<<<< HEAD
=======
    } else {
      // console.log(this.empleado.id_empleado);
      // this.ficharEmpleado();
>>>>>>> fb107f7... pasar a development
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
    switch (this.empleado.id_tipo) {
      case 5:
        // no se hace nada
        break;
      case 4:
        pedido.id_estado = 4; // entregado
        this.updateEstadoMesa(2, pedido);
        break;
      default:
        pedido.id_estado = 2; // preparandose
        break;
    }

    this.pedidoService.updatePedido(pedido.id_pedidos, pedido).subscribe(updatePedido => {
      console.log(updatePedido);
    });
    this.router.navigate(['/']);
  }

  pedidoListo(pedido: Pedido) {
    switch (this.empleado.id_tipo) {
      case 5:
        // no se hace nada
        break;
      case 4:
        pedido.id_estado = 5; // finalizado
        pedido.id_tipo_menu = 5;
        this.updateEstadoMesa(4, pedido); // actualizo el estado de la mesa
        break;
      default:
        pedido.id_estado = 3; // preparandose
        pedido.id_tipo_menu = 4;
        break;
    }

    this.pedidoService.updatePedido(pedido.id_pedidos, pedido).subscribe(updatePedido => {
      console.log(updatePedido);
    });
    this.router.navigate(['/']);

  }

  cerrarPedido(pedido: Pedido) {

  }

  updateEstadoMesa(id: number, pedido: Pedido) {
    const updateMesa: Partial<Mesa> = {
      id_estado_mesa: id,
    };
    this.mesaService.updateMesa(pedido.id_mesa, updateMesa).subscribe(mesa => {
      console.log(mesa);
    });
  }

}
