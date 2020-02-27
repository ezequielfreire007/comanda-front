import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterializeModule } from '../materialize/materialize.module';
import { TicketComponent } from './components/ticket/ticket.component';
import { ElmentoComponent } from './components/elmento/elmento.component';


@NgModule({
  declarations: [TicketComponent, ElmentoComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    MaterializeModule,
    SharedModule
  ]
})
export class TicketModule { }
