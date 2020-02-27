import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { Pedido } from 'src/app/core/models/pedido';
import { Empleado } from 'src/app/core/models/empleado';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  pedidos: Pedido[] = [];
  pedidosCobrar: Pedido[] = [];
  pedidosCobrarReduce: Pedido[] = [];
  empleado: Empleado;
  total: number;

  constructor(
    private pedidoService: PedidoService
  ) { 
    this.empleado = JSON.parse(localStorage.getItem('empleado'));
  }

  ngOnInit() {
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

  traerPorMesa() {
     // id_mesa: this.mesa.id_mesa
    const initialValue = 0;

    const mesa = JSON.parse(localStorage.getItem('mesa-cobrar'));

    this.pedidos.map(pedido => {
      if (pedido.id_mesa === mesa.id_mesa) {
        if (pedido.id_estado === 6) { // esta para cobrar
          this.pedidosCobrar.push(pedido);
        }
      }
    });

  }

}
