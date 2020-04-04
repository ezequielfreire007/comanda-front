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

  @ViewChild('producTable', {static: false}) table: MatTable<Pedido>;
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

  mesas: Mesa[] = [];
  pedidos: Pedido[] = [];
  mesa: Mesa;
  select: number;
  user: User;
  @Output() logout: EventEmitter<any> = new EventEmitter();

  constructor(
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);
   }

  ngOnInit() {
    if (!this.user) {
      this.router.navigate(['./cliente']);
    }
    this.fetchMesasAbiertas();
  }

  fetchMesasAbiertas() {
    const dateSearch = {
      id_estado_mesa: 6  // 6 - abierta
    };
    this.mesaService.getAllMesasAbiertas(dateSearch).subscribe( mesas => {
      this.mesas = mesas;
      console.log(mesas);
    });

  }

  seleccionarMesa(id: number) {
    this.select = id;
    // trae la mesa con el id seleccionado
    this.mesa = this.mesas.find( mesa => mesa.id_mesa === id);
    this.mesa.descripcion_estado_mesa = 'esperando';
    this.updateMesaEstado(id);

  }

  updateMesaEstado(id: number) {
    const dato = {
      id_estado_mesa: 1 // 1 - esperando
    };
    return this.mesaService.updateMesaCliente(id, dato).subscribe( update => {
      console.log(update);
    });
  }

  updateCodigoMesa() {
    // actualizo el codigo de la mesa
    const date = new Date().toISOString().slice(0, 10);
    const codAleatorio = `${this.aleatorio(100, 900)}-${date}`;
  }

  // genera un codigo aleatorio que luego se debe guardar en la base
  aleatorio(inferior, superior) {
    const resAleatorio = Math.floor((Math.random() * (superior - inferior + 1)) + inferior);
    return resAleatorio.toString();
  }

  salir() {
    // elimina el usuairo en localstorage y vuelve al login
    localStorage.removeItem('user');
    this.router.navigate(['./cliente']);
    this.logout.emit('logout');
  }

}
