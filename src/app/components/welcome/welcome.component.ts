import { OktaAuth } from '@okta/okta-auth-js';
import { Component, OnInit, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  
  name: string = "";

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  // if user is authenticated and logged in, get the name from them 
  async ngOnInit() {
    const isAuth = await this.oktaAuth.isAuthenticated();

    if(isAuth){
      const userClaims = await this.oktaAuth.getUser();
      this.name = userClaims.name || "";
    }
  }

}
