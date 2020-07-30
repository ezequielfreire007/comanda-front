import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigateComponent } from './components/navigate/navigate.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { EmpleadoEditComponent } from './components/empleado-edit/empleado-edit.component';
import { EmpleadoCreateComponent } from './components/empleado-create/empleado-create.component';
import { ChartComponent } from './components/chart/chart.component';
import { MesaService } from '../core/services/mesa/mesa.service';
import { MesaEditComponent } from './components/mesa-edit/mesa-edit.component';


const routes: Routes = [
  { path: '', component: NavigateComponent,
    children: [
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'mesas', component: MesasComponent },
      { path: 'mesas/edit/:id', component: MesaEditComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'empleados/create', component: EmpleadoCreateComponent },
      { path: 'empleados/edit/:id', component: EmpleadoEditComponent },
      { path: 'chart', component: ChartComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
