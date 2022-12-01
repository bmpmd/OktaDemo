import { OktaAuth } from '@okta/okta-auth-js';
import { Component, OnInit, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  //get access to  okta state. returns boolean 
  isAuth: boolean = false;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaAuth.authStateManager.subscribe((authState) => {
      //return state if found or return false if not found 
      this.isAuth = authState.isAuthenticated || false;

    }

    );

  }

  async ngOnInit() {
    this.isAuth = await this.oktaAuth.isAuthenticated()
  }


  logout() {
    this.oktaAuth.signOut();
  }

}
