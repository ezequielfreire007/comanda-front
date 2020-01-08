import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../../core/services/mesa/mesa.service';
import { Mesa } from 'src/app/core/models/mesa';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {

  mesas: Mesa[] = [];

  constructor(
    private mesaService: MesaService
  ) { }

  ngOnInit() {
    this.fetchMesa();
  }

  fetchMesa() {
    this.mesaService.getAllMesa()
    .subscribe(mesas => {
      console.log(mesas);
      this.mesas = mesas;
    });
  }

}
