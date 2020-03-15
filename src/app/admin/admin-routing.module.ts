import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigateComponent } from './components/navigate/navigate.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { EmpleadoEditComponent } from './components/empleado-edit/empleado-edit.component';


const routes: Routes = [
  { path: '', component: NavigateComponent,
    children: [
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'mesas', component: MesasComponent },
      { path: 'pedidos', component: PedidosComponent },
      // { path: 'empleado/create', component: FormProductComponent },
      { path: 'empleados/edit/:id', component: EmpleadoEditComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
