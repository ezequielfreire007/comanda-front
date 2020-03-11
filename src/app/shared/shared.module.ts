import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MaterializeModule } from '../materialize/materialize.module';
import { ValidarRolesDirective } from './directives/validar-roles/validar-roles.directive';
import { EstadoEmpleadoPipe } from './pipes/estado-empleado/estado-empleado.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ValidarRolesDirective,
    EstadoEmpleadoPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    EstadoEmpleadoPipe
  ],
  imports: [
    CommonModule,
    MaterializeModule,
    RouterModule,
    FormsModule,
  ]
})
export class SharedModule { }
