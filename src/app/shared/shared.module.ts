import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';


import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MaterializeModule } from '../materialize/materialize.module';
import { ValidarRolesDirective } from './directives/validar-roles/validar-roles.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ValidarRolesDirective
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterializeModule,
    RouterModule
  ]
})
export class SharedModule { }
