

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

//need to import our app config to use it! 
import myAppConfig from 'src/app/config/my-app-config';

//import sigin widget 
// @ts-ignore 
import OktaSignIn from '@okta/okta-signin-widget';

import { OKTA_AUTH } from '@okta/okta-angular';


//bring in okta auth service from oktaauth 
import { OktaAuth, Tokens } from '@okta/okta-auth-js';
const DEFAULT_ORIGINAL_URI = window.location.origin


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  oktaSignin: any;


  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({


      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      logo: 'assets/angular.png',
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Okta Demo app',
        },
      },
      authClient: oktaAuth,
    });
  }

  ngOnInit(): void {
    // When navigating to a protected route, the route path is saved as the `originalUri`
    // If no `originalUri` has been saved, then redirect back to the app root
    const originalUri = this.oktaAuth.getOriginalUri();
    if (!originalUri || originalUri === DEFAULT_ORIGINAL_URI) {
      this.oktaAuth.setOriginalUri('/');
    }

    // Search for URL Parameters to see if a user is being routed to the application to recover password
    var searchParams = new URL(window.location.href).searchParams;
    this.oktaSignin.otp = searchParams.get('otp');
    this.oktaSignin.state = searchParams.get('state');

    this.oktaSignin.showSignInToGetTokens({
      el: '#okta-sign-in-widget',
      scopes: myAppConfig.oidc.scopes
    }).then((tokens: Tokens) => {
      // Remove the widget
      this.oktaSignin.remove();

      // In this flow the redirect to Okta occurs in a hidden iframe
      this.oktaAuth.handleLoginRedirect(tokens);
    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });
  }



  ngOnDestroy(): void {
    this.oktaSignin.remove()
  }

}
