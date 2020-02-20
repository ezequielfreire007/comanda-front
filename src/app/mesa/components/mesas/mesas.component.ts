import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../../core/services/mesa/mesa.service';
import { Mesa } from 'src/app/core/models/mesa';
import { EstadosMesaService } from '../../../core/services/estados-mesa/estados-mesa.service';
import { EstadosMesa } from '../../../core/models/estados-mesa';

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
    private estadoMesaService: EstadosMesaService
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

}
