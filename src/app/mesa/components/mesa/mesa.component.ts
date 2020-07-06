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
  // @Output() productClicket: EventEmitter<any> = new EventEmitter();

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

  // updateMesa() {
  //   const updateMesa: Partial<Mesa> = {
  //     id_estado_mesa: this.selected,
  //   };
  //   this.mesaService.updateMesa(this.mesa.id_mesa, updateMesa).subscribe(mesa => {
  //     console.log(mesa);
  //   });
  // }

  cobrarCuenta() {
    const mesa = {
      id_mesa: this.mesa.id_mesa
    };
    localStorage.setItem('mesa-cobrar', JSON.stringify(mesa));
  }

}
