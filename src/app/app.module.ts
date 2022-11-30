
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';


import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from '@angular/material/menu';




import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';
import { Router } from '@angular/router';
import myAppConfig from './config/my-app-config';
import { OktaAuth } from '@okta/okta-auth-js';




function onAuthRequired(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available within your application

  
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const oktaAuth = new OktaAuth(myAppConfig.oidc);



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatCommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    OktaAuthModule,




  ],
  providers: [
    {
      provide: OKTA_CONFIG,
      useValue: {
        oktaAuth,
        onAuthRequired
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
