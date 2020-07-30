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

  deleteMesa(mesa: Mesa) {
    this.mesaService.deleteMesa(`${mesa.id_mesa}`).subscribe( mesa => {
      console.log(mesa);
      this.fetchMesas();
    });
    // this.mesaService.(mesa.id_empleado.toString())
    //   .subscribe( empleadoDelete => {
    //     console.log(empleadoDelete);
    //     this.fetchAll();
    //   });
  }
}
