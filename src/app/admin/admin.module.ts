import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavigateComponent } from './components/navigate/navigate.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MaterializeModule } from '../materialize/materialize.module';
import { SharedModule } from '../shared/shared.module';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { EmpleadoEditComponent } from './components/empleado-edit/empleado-edit.component';


@NgModule({
  declarations: [NavigateComponent, EmpleadosComponent, MesasComponent, PedidosComponent, EmpleadoEditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterializeModule,
    SharedModule
  ]
})
export class AdminModule { }
