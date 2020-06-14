import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { MaterializeModule } from '../materialize/materialize.module';


@NgModule({
  declarations: [LoginComponent, HomeComponent, RegistrarComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    MaterializeModule
  ]
})
export class ClienteModule { }
