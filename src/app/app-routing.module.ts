import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
const routes: Routes = [

  // wamnt to protect this route, no unauth users must access tyhis!
  // okta has a router guarad we can use vvv 
  {path: 'welcome', component: WelcomeComponent, canActivate: [OktaAuthGuard] },  
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo:'welcome', pathMatch: 'full'}
];
   
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
