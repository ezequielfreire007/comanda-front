import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesaRoutingModule } from './mesa-routing.module';
import { MesaComponent } from './components/mesa/mesa.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { MaterializeModule } from '../materialize/materialize.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MesaComponent, MesasComponent],
  imports: [
    CommonModule,
    MesaRoutingModule,
    MaterializeModule,
    SharedModule
  ]
})
export class MesaModule { }
