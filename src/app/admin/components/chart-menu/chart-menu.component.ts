import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';
import { Pedido } from 'src/app/core/models/pedido';
import { CantMenu } from 'src/app/core/models/cant-menu';

@Component({
  selector: 'app-chart-menu',
  templateUrl: './chart-menu.component.html',
  styleUrls: ['./chart-menu.component.scss']
})
export class ChartMenuComponent implements OnInit {

  pedidos: Pedido[] = [];
  cantMenu: CantMenu = {
    cantArepa: 0,
    cantPizza: 0,
    cantCerveza: 0,
    cantCocacola: 0,
    cantHamburguesa: 0,
    cantTragos: 0,
    cantMilanesa: 0,
    cantPepito: 0
  };
  doughnutChartLabels: Label[] = [
    'arepa',
    'pizza',
    'cerveza',
    'coca cola',
    'hamburguesa',
    'tragos',
    'milanesa',
    'pepito',
  ];
  doughnutChartData: MultiDataSet = [
    [
      this.cantMenu.cantArepa,
      this.cantMenu.cantPizza,
      this.cantMenu.cantCerveza,
      this.cantMenu.cantCocacola,
      this.cantMenu.cantHamburguesa,
      this.cantMenu.cantTragos,
      this.cantMenu.cantMilanesa,
      this.cantMenu.cantPepito
    ]
  ];
  doughnutChartType: ChartType = 'doughnut';

  constructor(
    private pedidosService: PedidoService
  ) { }

  ngOnInit() {
    this.fetchPeidos();
  }

  fetchPeidos() {
    this.pedidosService.getAllPedido().subscribe( pedidos => {
      console.log(pedidos)
      this.pedidos = pedidos;
      this.generarGraficos();
    });
    console.log(this.cantMenu)
  }

  generarGraficos() {
    let dateActual = new Date();
    let dateTemp = dateActual.toISOString().slice(0, 10).split('-');
    console.log(dateTemp[0])
    this.pedidos.forEach( pedido => {
      // console.log(pedido)
      let fechaped = pedido.fecha_pedido.split('-');
      console.log(fechaped[0])
      if ( dateTemp[0] === fechaped[0] ) {
        console.log(pedido.id_menu)
        switch (pedido.id_menu) {
          case 2:
            
            this.cantMenu.cantArepa += 1;
            break;
          case 3:
            this.cantMenu.cantPizza += 1;
            break;
          case 4:
            this.cantMenu.cantCerveza += 1;
            break;
          case 5:
            this.cantMenu.cantCocacola += 1;
            break;
          case 6:
            this.cantMenu.cantHamburguesa += 1;
            break;
          case 7:
            this.cantMenu.cantTragos += 1;
            break;
          case 8:
            this.cantMenu.cantMilanesa += 1;
            break;
          case 9:
            this.cantMenu.cantPepito += 1;
            break;
          default:
            break;
        }
      }

      this.doughnutChartData = [
        [
          this.cantMenu.cantArepa,
          this.cantMenu.cantPizza,
          this.cantMenu.cantCerveza,
          this.cantMenu.cantCocacola,
          this.cantMenu.cantHamburguesa,
          this.cantMenu.cantTragos,
          this.cantMenu.cantMilanesa,
          this.cantMenu.cantPepito
        ]
      ];
    });
  }

}
