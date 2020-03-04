import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';

import { JwtModule } from '@auth0/angular-jwt';
import { ErrorInterceptor } from './utils/ErrorInterceptor';
import { JwtInterceptor } from './utils/JWTInterceptro';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

export function getAccessToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    [JwtModule.forRoot({
      config: {
        tokenGetter: (getAccessToken),
        whitelistedDomains: ['http://localhost:4200', 'localhost:4200',]
      }
    })]
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: SpinnerInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    // {
    //   provide: RECAPTCHA_SETTINGS,
    //   useValue: {
    //     siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    //   } as RecaptchaSettings,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
