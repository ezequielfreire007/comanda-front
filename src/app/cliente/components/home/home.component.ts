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
  codigo: string;
  cuenta: number;

  constructor(
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit() {
    this.fetchMesasAbiertas();
    this.cuenta = 0;
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
    console.log(`seleccionar mesa`)
    this.select = id;
    // trae la mesa con el id seleccionado
    this.mesa = this.mesas.find( mesa => mesa.id_mesa === id);
    console.log(this.mesa);
    this.traerMesa(`${id}`);
    // this.mesa.descripcion_estado_mesa = 'esperando';
    this.updateMesaEstado(id); // la paso a esperando
    this.updateCodigoMesa(id); // codigo mesa
    this.traerMesa(`${id}`);
  }

  updateMesaEstado(id: number) {
    console.log(`actualizar mesa`)
    const dato = {
      id_estado_mesa: 1 // 1 - esperando
    };
    return this.mesaService.updateMesaCliente(id, dato).subscribe( update => {
      console.log(update);
    });
  }

  // esto tiene que ser igual a lo que ve el mozo
  fetchPedidos() {
    console.log('se esta llamando el fetch ');
    const date = new Date().toISOString().slice(0, 10);

    console.log(`${this.codigo}`);
    const dateSearch = {
      codigo_pedido: this.mesa.codigo_mesa ,
      fecha_serch: date,
    };
    this.pedidoService.getPedidoFechaMesa(dateSearch).subscribe(pedidos => {
      this.pedidos = pedidos;
      // this.traerMesa(`${this.mesa.id_mesa}`)
      this.totalPedido();
    });


  }

  updateCodigoMesa(id: number) {
    console.log(`actualiza codigo`)
    // genero el codigo del cliente
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date();
    const miTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    const codigoMesa = `${this.aleatorio(100, 900)}-${date}-${miTime}`;
    const dato = {
      codigo_mesa: codigoMesa
    };
    // actualizo el codigo de la mesa
    this.mesaService.updateMesaCodigo(id, dato).subscribe( mesa => {
      this.traerMesa(`${id}`);
    });

  }

  traerMesa(id: string) {
    console.log(`traer mesa`)
    this.mesaService.getMesa(id).subscribe( mesa => {
      console.log(mesa);
      this.mesa = mesa;
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

  pedirCuenta() {
    this.updateEstadoMesa(this.mesa.id_mesa);
  }

  updateEstadoMesa(id: number) {
    console.log(`actualiza a pedir cuenta`)
    const dato = {
      id_estado_mesa: 5 // 5 - pidiendo cuenta
    };
    this.mesaService.updateMesaCliente(id, dato).subscribe(mesa => {
      console.log(mesa);
      this.traerMesa(`${id}`);
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
