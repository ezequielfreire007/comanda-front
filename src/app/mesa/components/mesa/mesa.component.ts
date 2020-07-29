import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mesa } from 'src/app/core/models/mesa';
import { EstadosMesa } from '../../../core/models/estados-mesa';
import { MesaService } from '../../../core/services/mesa/mesa.service';

import { Pedido } from '../../../core/models/pedido';
import { Empleado } from 'src/app/core/models/empleado';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {
  @Input() mesa: Mesa;
  @Output() mesaClicket: EventEmitter<any> = new EventEmitter();

  @Input() estadoMesa: EstadosMesa[] = [];
  selected: number;

  constructor(
    private mesaService: MesaService
  ) { }

  ngOnInit() {
    // this.selected = this.mesa.id_estado_mesa;
    // localStorage.removeItem('empleado');
    // localStorage.removeItem('pedido');
  }

  selectMesa() {
    console.log(this.selected);
    if (this.selected) {
      if (this.selected !== this.mesa.id_estado_mesa ) {
        console.log('actualizo base de datos');
        try {
          // this.updateMesa();
        } catch (error) {
          console.log(error);
        }

      } else {
        console.log('no actualizo base de datos');
      }
    } else {
      console.log('no hace nada');
    }
  }

  cobrarCuenta(mesa: Mesa) {
    console.log(`emito la mesa`);
    this.mesaClicket.emit(mesa);
  }

}
