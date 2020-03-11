import { Component, OnInit, ViewChild } from '@angular/core';
import { MesaService } from '../../../core/services/mesa/mesa.service';
import { Mesa } from '../../../core/models/mesa';
import { MatTableDataSource, MatTable } from '@angular/material';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {

  // id_mesa: 1
  // codigo_mesa: "mesa_01"
  // id_estado_mesa: 4
  // descripcion_estado_mesa: "cerrada"
  // foto_mesa: "assets/img/mesa/mesa1.jpg"
  @ViewChild('producTable', {static: false}) table: MatTable<Mesa>;
  mesas: Mesa[] = [];

  displayedColumns: string[] = [
    'id_mesa',
    'codigo_mesa',
    'descripcion_estado_mesa',
    'actions'
  ];

  constructor(
    private mesaService: MesaService
  ) { }

  ngOnInit() {
    this.fetchMesas();
  }

  fetchMesas() {
    this.mesaService.getAllMesa().subscribe(mesas => {
      console.log(mesas);
      this.mesas = mesas;
    });
  }
}
