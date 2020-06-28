import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mesa } from 'src/app/core/models/mesa';
import { EstadosMesa } from '../../../core/models/estados-mesa';
import { MesaService } from '../../../core/services/mesa/mesa.service';

import { Pedido } from '../../../core/models/pedido';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Empleado } from 'src/app/core/models/empleado';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {
  @Input() mesa: Mesa;
  // @Output() productClicket: EventEmitter<any> = new EventEmitter();

  @Input() estadoMesa: EstadosMesa[] = [];
  selected: number;
  pedido: Pedido = {};
  helper = new JwtHelperService();
  empleado: Empleado;

  constructor(
    private mesaService: MesaService
  ) { }

  ngOnInit() {
    this.selected = this.mesa.id_estado_mesa;
    localStorage.removeItem('empleado');
    localStorage.removeItem('pedido');
  }

  selectMesa() {
    console.log(this.selected);
    if (this.selected) {
      if (this.selected !== this.mesa.id_estado_mesa ) {
        console.log('actualizo base de datos');
        try {
          this.updateMesa();
        } catch (error) {
          console.log(error);
        }

      } else {
        console.log('no actualizo base de datos');
      }

      // Genero pedido y lo guardo en localStorage para lueo persistir en db
      const decodeToken =  this.helper.decodeToken(localStorage.getItem('token')); // decodifico el token para tomar datos del empleados

      // this.pedido.id_estado = this.mesa.id_estado_mesa;
      this.pedido.id_estado = 1; // pediente
      this.pedido.id_mesa = this.mesa.id_mesa;
      this.pedido.id_mozo = decodeToken.empleado.id_empleado;
      this.pedido.id_empleado = decodeToken.empleado.id_empleado;

      console.log(this.pedido);
      localStorage.setItem('pedido', JSON.stringify(this.pedido));
      // localStorage.setItem('empleado', JSON.stringify(decodeToken.empleado));
    } else {
      console.log('no hace nada');
    }
  }

  updateMesa() {
    const updateMesa: Partial<Mesa> = {
      id_estado_mesa: this.selected,
    };
    this.mesaService.updateMesa(this.mesa.id_mesa, updateMesa).subscribe(mesa => {
      console.log(mesa);
    });
  }

  cobrarCuenta() {
    const mesa = {
      id_mesa: this.mesa.id_mesa
    };
    localStorage.setItem('mesa-cobrar', JSON.stringify(mesa));
  }

}
