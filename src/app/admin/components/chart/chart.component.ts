import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';
import { Pedido } from 'src/app/core/models/pedido';
import { CantMes } from 'src/app/core/models/cant-mes';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  pedidos: Pedido[] = [];
  cantPorMes: CantMes = {
    cantEnero: 0,
    cantFebrero: 0,
    cantMarzo: 0,
    cantAbril: 0,
    cantMayo: 0,
    cantJunio: 0,
    cantJulio: 0,
    cantAgosto: 0,
    cantSeptiembre: 0,
    cantOctubre: 0,
    cantNoviembre: 0,
    cantDiciembre: 0
};

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {
      data: [
        this.cantPorMes.cantEnero,
        this.cantPorMes.cantFebrero,
        this.cantPorMes.cantMarzo,
        this.cantPorMes.cantAbril,
        this.cantPorMes.cantMayo,
        this.cantPorMes.cantJunio,
        this.cantPorMes.cantJulio,
        this.cantPorMes.cantAgosto,
        this.cantPorMes.cantSeptiembre,
        this.cantPorMes.cantOctubre,
        this.cantPorMes.cantNoviembre,
        this.cantPorMes.cantDiciembre
      ],
      label: 'cant pedidos vendido' }
  ];

  constructor(
    private pedidosService: PedidoService
  ) { }

  ngOnInit() {
    this.fetchPeidos();
  }

  fetchPeidos() {
    this.pedidosService.getAllPedido().subscribe( pedidos => {
      // console.log(pedidos);
      this.pedidos = pedidos;
      this.generarGraficos();
    });

  }

  generarGraficos() {
    // se filtra por año para asignar cantidades por mes
    console.log('ingresa a generar graficos ')
    let dateActual = new Date();
    let dateTemp = dateActual.toISOString().slice(0, 10).split('-');

    this.pedidos.forEach( pedido => {
      let fechaped = pedido.fecha_pedido.split('-');
      if (dateTemp[0] === fechaped[0]) {
        switch (fechaped[1]) {
          case '01':
            this.cantPorMes.cantEnero += 1;
            break;
          case '02':
            console.log('entro a 2')
            this.cantPorMes.cantFebrero += 1;
            break;
          case '03':
            this.cantPorMes.cantMarzo += 1;
            break;
          case '04':
            this.cantPorMes.cantAbril += 1;
            break;
          case '05':
            this.cantPorMes.cantMayo += 1;
            break;
          case '06':
            this.cantPorMes.cantJunio += 1;
            break;
          case '07':
            this.cantPorMes.cantJunio += 1;
            break;
          case '08':
            this.cantPorMes.cantAgosto += 1;
          break;
          case '09':
            this.cantPorMes.cantSeptiembre += 1;
          break;
          case '10':
            this.cantPorMes.cantOctubre += 1;
          break;
          case '11':
            this.cantPorMes.cantNoviembre += 1;
          break;
          case '12':
            this.cantPorMes.cantDiciembre += 1;  
            break;
          default:
            break;
        }
      }

      this.barChartData = [{
        data: [
          this.cantPorMes.cantEnero,
          this.cantPorMes.cantFebrero,
          this.cantPorMes.cantMarzo,
          this.cantPorMes.cantAbril,
          this.cantPorMes.cantMayo,
          this.cantPorMes.cantJunio,
          this.cantPorMes.cantJulio,
          this.cantPorMes.cantAgosto,
          this.cantPorMes.cantSeptiembre,
          this.cantPorMes.cantOctubre,
          this.cantPorMes.cantNoviembre,
          this.cantPorMes.cantDiciembre
        ],
        label: 'cant pedidos vendido' }
      ];
      console.log(this.cantPorMes)
    });

  }

}
