import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from '../materialize/materialize.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterializeModule,
    SharedModule
  ]
})
export class AuthModule { }
