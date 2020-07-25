import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Mesa } from '../../../core/models/mesa';
import { MesaService } from '../../../core/services/mesa/mesa.service';
import { Pedido } from '../../../core/models/pedido';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { User } from '../../../core/models/userSocial';
import { MatTableDataSource, MatTable } from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('pedidoTable', {static: false}) table: MatTable<Pedido>;
  displayedColumns: string[] = [
    'codigo_pedido',
    'descripcion_estado',
    'hora_inicio_pedido',
    'hora_estimada_entrega_pedido',
    'nombre_menu',
    'precio_menu'
  ];

  mesas: Mesa[] = [];
  pedidos: Pedido[] = [];
  mesa: Mesa;
  select: number;
  user: User;
  mesaSelect: Mesa;
  // @Output() logout: EventEmitter<any> = new EventEmitter();

  constructor(
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit() {
    this.fetchMesasAbiertas();
    console.log('ngOnInit');
  }

  fetchMesasAbiertas() {
    const dateSearch = {
      id_estado_mesa: 6  // 6 - abierta
    };
    this.mesaService.getAllMesasAbiertas(dateSearch).subscribe( mesas => {
      this.mesas = mesas;
    });
  }

  seleccionarMesa(id: number) {
    this.select = id;
    // trae la mesa con el id seleccionado
    this.mesa = this.mesas.find( mesa => mesa.id_mesa === id);
    this.mesa.descripcion_estado_mesa = 'esperando';
    this.updateMesaEstado(id); // la paso a esperando
    this.updateCodigoMesa(id); // codigo mesa
  }

  updateMesaEstado(id: number) {
    const dato = {
      id_estado_mesa: 1 // 1 - esperando
    };
    return this.mesaService.updateMesaCliente(id, dato).subscribe( update => {
      console.log(update);
    });
  }

  // esto tiene que ser igual a lo que ve el mozo
  fetchPedidos() { // falta hacer que traeiga el pedido por orden pero primero se tiene que hacer lo del mozo
    console.log('se esta llamando el fetch ');
    const date = new Date().toISOString().slice(0, 10);
    // const date2 = new Date();

    // console.log(`${date2.getHours()}:${date2.getMinutes()}:${date2.getSeconds()}`);

    console.log(`${this.mesaSelect}`)
    const dateSearch = {
      codigo_pedido: this.mesaSelect.codigo_mesa ,
      fecha_serch: date,
    };
    this.pedidoService.getPedidoFechaMesa(dateSearch).subscribe(pedidos => {
      // console.log(pedidos);
      this.pedidos = pedidos;
    });
  }

  updateCodigoMesa(id: number) {
    // genero el codigo del cliente
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date();
    const miTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    const codigoMesa = `${this.aleatorio(100, 900)}-${date}-${miTime}`;
    const dato = {
      codigo_mesa: codigoMesa
    };
    // actualizo el codigo de la mesa
    this.mesaService.updateMesaCodigo(id, dato).subscribe( mesa => console.log(mesa));

    this.mesaService.getMesa(`${id}`).subscribe(mesa => {
      this.mesaSelect = mesa;
    });

  }

  // genera un codigo aleatorio que luego se debe guardar en la base
  aleatorio(inferior, superior) {
    const resAleatorio = Math.floor((Math.random() * (superior - inferior + 1)) + inferior);
    return resAleatorio.toString();
  }

  salir() {
    // elimina el usuairo en localstorage y vuelve al login
    localStorage.removeItem('user');
    this.router.navigate(['./']);
    // this.logout.emit('logout');
  }

}
