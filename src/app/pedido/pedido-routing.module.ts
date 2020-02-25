import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidosListComponent } from './components/pedidos-list/pedidos-list.component';


const routes: Routes = [
  { path: '', component: PedidosListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
