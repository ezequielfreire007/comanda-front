import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../../core/services/mesa/mesa.service';
import { Mesa } from 'src/app/core/models/mesa';
import { EstadosMesaService } from '../../../core/services/estados-mesa/estados-mesa.service';
import { EstadosMesa } from '../../../core/models/estados-mesa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {

  mesas: Mesa[] = [];
  estadoMesa: EstadosMesa[] = [];

  constructor(
    private mesaService: MesaService,
    private estadoMesaService: EstadosMesaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchMesa();
    this.fetchEstados();
  }

  fetchMesa() {
    this.mesaService.getAllMesa()
    .subscribe(mesas => {
      console.log(mesas);
      this.mesas = mesas;
    });
  }

  fetchEstados() {
    this.estadoMesaService.getAllEstadosMesa()
    .subscribe( estadoMesa => {
      console.log(estadoMesa);
      this.estadoMesa = estadoMesa;
    });
  }

  cobrarCuenta(mesa: Mesa) {
    console.log('entro a mesas');
    console.log(mesa);
    
    localStorage.setItem('mesa-cobrar', JSON.stringify(mesa));
    this.updateMesa(mesa.id_mesa);

    this.router.navigate(['./ticket']);
  }

  updateMesa(id) {
    const mesa = {
      id_estado_mesa: 6 // -> vuelve al estado abierta
    }
    this.mesaService.updateMesa(id, mesa).subscribe( mesa => {
      console.log(mesa);
    })
  }

}
