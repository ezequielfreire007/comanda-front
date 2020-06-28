import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { MaterializeModule } from '../materialize/materialize.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EmpleadoComponent, EmpleadosComponent],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    MaterializeModule,
    SharedModule
  ]
})
export class EmpleadoModule { }
