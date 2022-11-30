

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

//need to import our app config to use it! 
import myAppConfig from 'src/app/config/my-app-config';

//import sigin widget 
// @ts-ignore 
import OktaSignIn from '@okta/okta-signin-widget'; 

import { OKTA_AUTH } from '@okta/okta-angular';


//bring in okta auth service from oktaauth 
import { OktaAuth } from '@okta/okta-auth-js';
 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
 
  oktaSignin: any;


  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      
      features: {
        registration: true
      },
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {
    console.log("BASE URL: ")
    console.log(myAppConfig.oidc.issuer.split('/oauth2')[0])
    this.oktaSignin.renderEl({ el: '#okta-sign-in-widget' },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }

      }, (error: any) => {
        throw error;
      });

  }

  ngOnDestroy(): void {
    this.oktaSignin.remove()
  }

}
