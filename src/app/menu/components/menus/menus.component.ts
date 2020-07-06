import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu/menu.service';
import { PedidoService } from '../../../core/services/pedido/pedido.service';
import { MatTableDataSource, MatTable } from '@angular/material';

import { Menu } from 'src/app/core/models/menu';
import { Mesa } from 'src/app/core/models/mesa';
import { Empleado } from '../../../core/models/empleado';
import { Pedido } from '../../../core/models/pedido';
import { Router } from '@angular/router';
import { MesaService } from 'src/app/core/services/mesa/mesa.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  menus: Menu[] = [];
  mesas: Mesa[] = [];
  pedidos: Pedido[] = [];
  temPedidos: Pedido[] = [];
  empleado: Empleado;
  pedido: Pedido = {};
  menu: Menu;
  horaInicio: string;
  horaEntrega: string;
  pedidoFecha: string;
  mesaSeleccionada: Mesa;
  helper = new JwtHelperService();
  cuenta: number;

  @ViewChild('pedidoTable', {static: false}) table: MatTable<Pedido>;
  displayedColumns: string[] = [
    'codigo_pedido',
    'hora_inicio_pedido',
    'hora_estimada_entrega_pedido',
    'nombre_menu',
    'precio_menu'
  ];

  constructor(
    private menuService: MenuService,
    private pedidoService: PedidoService,
    private mesaService: MesaService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.pedido = JSON.parse(localStorage.getItem('pedido'));
    // if (!this.pedido) {
    //   console.log(`donde regresaba a mesas porque no esta el pedido`)
    //   // this.router.navigate(['/mesa']);
    // }
    this.fetchMenu();
    this.fetchMesa();
    this.cuenta = 0;
    // obtengo datos del empleado en el token
    this.empleado =  this.helper.decodeToken(localStorage.getItem('token')).empleado;
  }

  // primero tengo que seleccionar la mesa
  clickMesa(mesa) {
    this.mesaSeleccionada = mesa;
    // refrescos las listas
    this.temPedidos = [];
    this.pedidos = [];
    this.cuenta = 0;
    // console.log(this.mesaSeleccionada);
  }

  clickMenu(id: number) {
    this.pedido = {};
    this.menu = this.menus.find(menu => menu.id_menu === id ? menu : null);
    // this.empleado = JSON.parse(localStorage.getItem('empleado'));
    console.log(this.menu);

    this.pedido.id_estado = 1; // pediente
    this.pedido.id_mesa = this.mesaSeleccionada.id_mesa;
    this.pedido.id_mozo = this.empleado.id_empleado;
    this.pedido.id_empleado = this.empleado.id_empleado;
    this.pedido.nombre_menu = this.menu.nombre_menu;
    this.pedido.precio_menu = this.menu.precio_menu;

    // Seteo el horario de inicio del pedido
    const horaInicio = new Date(); // Y-m-d H:i:s'
    const horaEntrega = new Date();
    horaEntrega.setTime(horaEntrega.getTime());
    // this.pedidoFecha = horaInicio.getUTCFullYear().toString() + '-' +
    //                    horaInicio.getMonth().toString() + '-' +
    //                    horaInicio.getDate().toString();
    this.pedidoFecha = horaInicio.toISOString().slice(0, 10);

    this.pedido.fecha_pedido = this.pedidoFecha;
    this.horaInicio = horaInicio.getHours().toString() + ':' +
                      horaInicio.getMinutes().toString() + ':' +
                      horaInicio.getSeconds().toString();

    // Setea 30 min mas a la hora de inicio
    horaEntrega.setMinutes(horaEntrega.getMinutes() + 30);

    this.horaEntrega = horaEntrega.getHours().toString() + ':' +
                       horaEntrega.getMinutes().toString() + ':' +
                       horaEntrega.getSeconds().toString();


    // Seteo los datos al pedido
    this.pedido.fecha_pedido = this.horaInicio;
    this.pedido.codigo_pedido = this.mesaSeleccionada.codigo_mesa;
    this.pedido.hora_inicio_pedido = this.horaInicio;
    this.pedido.hora_estimada_entrega_pedido = this.horaEntrega;
    this.pedido.id_menu = this.menu.id_menu;
    this.pedido.id_tipo_menu = this.menu.id_tipo;

    console.warn(this.pedido);
    this.temPedidos.push(this.pedido);
    this.pedidos = JSON.parse(JSON.stringify(this.temPedidos));
    this.totalPedido();
   // this.pedidos.push(this.pedido);
    // this.pedidos.push(JSON.parse(JSON.stringify(this.temPedidos)));
    // console.log(`lista de pedidos`)
    // console.log(this.pedidos)
    // console.log(`lista de pedidos temp`)
    // console.log(this.temPedidos)
    
   // this.createPedido(this.pedido);

  }

  fetchMenu() {
    this.menuService.getAllMenus()
    .subscribe( menus => {
      // console.log(menus);
      this.menus = menus;
    });
  }

  fetchMesa() {
    this.mesaService.getAllMesa()
    .subscribe(mesas => {
      console.log(mesas);
      this.mesas = mesas;
    });
  }

  fetchPedidos() { // falta hacer que traeiga el pedido por orden pero primero se tiene que hacer lo del mozo
    const date = new Date().toISOString().slice(0, 10);
    const dateSearch = {
      fecha_serch: date,
    };
    this.pedidoService.getPedidoFecha(dateSearch).subscribe(pedidos => {
      console.log(pedidos);
      this.pedidos = pedidos;
    });
  }

  totalPedido() {
    if ( this.pedidos ) {
      let temp = this.pedidos;
      let sum = [];
      let retorno;
      temp.forEach( (dato) => {
        sum.push(dato.precio_menu);
      });

      retorno = sum.reduce((antes, desp) => {
        return antes + desp;
      })
      
      this.cuenta = retorno;
      console.log(retorno);
    }
  }

  createPedido(pedido: Pedido) {
    this.pedidoService.createPedido(pedido).subscribe(pedido => {
      console.log(pedido);
    });
  }

  // lo paso al cliente esto se tiene que dejar de usar recodatorio para cuando vuelva a mozo
  aleatorio(inferior, superior) {
    const resAleatorio = Math.floor((Math.random() * (superior - inferior + 1)) + inferior);
    return resAleatorio.toString();
  }

}
