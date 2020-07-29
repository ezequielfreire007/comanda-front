import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { Pedido } from 'src/app/core/models/pedido';
import { Empleado } from 'src/app/core/models/empleado';
import { Mesa } from 'src/app/core/models/mesa';

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
  mesa: Mesa;
  cuenta: number;
  fecha: string;
  hora: number;

  constructor(
    private pedidoService: PedidoService
  ) {
    this.empleado = JSON.parse(localStorage.getItem('empleado'));
    this.mesa = JSON.parse(localStorage.getItem('mesa-cobrar'));
    console.log(this.mesa);
  }

  ngOnInit() {
    this.cuenta = 0;
    this.cabeceraTicket();
    this.fetchPedidos();
    this.totalPedido();
  }

  cabeceraTicket() {
    const date = new Date();
    const dateTemp = date.toISOString().slice(0, 10).split('-');
    this.fecha = `${dateTemp[2]}/${dateTemp[1]}/${dateTemp[0]}`;
    this.hora = date.getTime();

  }

  fetchPedidos() {
    console.log('se esta llamando el fetch ');
    const date = new Date().toISOString().slice(0, 10);
    console.log(this.mesa.codigo_mesa);
    const dateSearch = {
      codigo_pedido: '315-2020-07-29-21:10:7' ,
      fecha_serch: date,
    };
    this.pedidoService.getPedidoFechaMesa(dateSearch).subscribe(pedidos => {
      this.pedidos = pedidos;
      this.totalPedido();
    });
  }

  totalPedido() {
    if ( this.pedidos ) {
      let temp = this.pedidos;
      let sum = [];
      let retorno = 0;
      temp.forEach( (dato) => {
        sum.push(dato.precio_menu);
      });

      retorno = sum.reduce((antes, desp) => {
        return antes + desp;
      });

      this.cuenta = retorno;
      console.log(retorno);
    }
  }

}
