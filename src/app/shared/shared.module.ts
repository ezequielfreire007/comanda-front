import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MaterializeModule } from '../materialize/materialize.module';
import { ValidarRolesDirective } from './directives/validar-roles/validar-roles.directive';
import { EstadoEmpleadoPipe } from './pipes/estado-empleado/estado-empleado.pipe';
import { ValorMayusculaPipe } from './pipes/valor-mayuscula/valor-mayuscula.pipe';
import { GreenDirective } from './directives/color-estado-mesa/green.directive';
import { BlueDirective } from './directives/color-estado-mesa/blue.directive';
import { OrangeDirective } from './directives/color-estado-mesa/orange.directive';
import { EstadosMesaPipe } from './pipes/estados_mesa/estados-mesa.pipe';
import { ChartsModule } from 'ng2-charts';

// Importo componentes para captcha
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ValidarRolesDirective,
    EstadoEmpleadoPipe,
    ValorMayusculaPipe,
    GreenDirective,
    BlueDirective,
    OrangeDirective,
    EstadosMesaPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    EstadoEmpleadoPipe,
    ValidarRolesDirective,
    ValorMayusculaPipe,
    ReactiveFormsModule,
    GreenDirective,
    BlueDirective,
    OrangeDirective,
    EstadosMesaPipe,
    ChartsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
  ],
  imports: [
    CommonModule,
    MaterializeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LcjdrkZAAAAAAyui4qv7lvtOpEeZlfixw5UsE5f',
      } as RecaptchaSettings,
    }
  ]
})
export class SharedModule { }
