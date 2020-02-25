import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu/menu.service';
import { PedidoService } from '../../../core/services/pedido/pedido.service';

import { Menu } from 'src/app/core/models/menu';
import { Empleado } from '../../../core/models/empleado';
import { Pedido } from '../../../core/models/pedido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  menus: Menu[] = [];
  empleado: Empleado;
  pedido: Pedido;
  menu: Menu;
  horaInicio: string;
  horaEntrega: string;
  pedidoFecha: string;

  constructor(
    private menuService: MenuService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pedido = JSON.parse(localStorage.getItem('pedido'));
    if (!this.pedido) {
      this.router.navigate(['/mesa']);
    }
    this.fetchMenu();
  }

  clickMenu(id: number) {
    this.menu = this.menus.find(menu => menu.id_menu === id ? menu : null);
    this.empleado = JSON.parse(localStorage.getItem('empleado'));

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
    this.pedido.codigo_pedido = this.aleatorio(100, 900);
    this.pedido.hora_inicio_pedido = this.horaInicio;
    this.pedido.hora_estimada_entrega_pedido = this.horaEntrega;
    this.pedido.id_menu = this.menu.id_menu;
    this.pedido.id_tipo_menu = this.menu.id_tipo;

    console.log(this.pedido);
    this.createPedido(this.pedido);

  }

  fetchMenu() {
    this.menuService.getAllMenus()
    .subscribe( menus => {
      console.log(menus);
      this.menus = menus;
    });
  }

  createPedido(pedido: Pedido) {
    this.pedidoService.createPedido(pedido).subscribe(pedido => {
      console.log(pedido);
    });
  }

  aleatorio(inferior, superior) {
    const resAleatorio = Math.floor((Math.random() * (superior - inferior + 1)) + inferior);
    return resAleatorio.toString();
  }

}
