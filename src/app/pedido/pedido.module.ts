import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidosListComponent } from './components/pedidos-list/pedidos-list.component';
import { MaterializeModule } from '../materialize/materialize.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PedidosComponent, PedidosListComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    MaterializeModule,
    SharedModule
  ]
})
export class PedidoModule { }
