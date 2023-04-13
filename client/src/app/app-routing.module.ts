import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SuccessComponent } from './pages/success/success.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes:Routes = [
  {path: "", component: HomeComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "menu", component: MenuComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: "payment/success", component: SuccessComponent},
  {path: "login/callback", component: OktaCallbackComponent},
  {path: "profile/:email", canActivate: [OktaAuthGuard] ,component: ProfileComponent},
  {path: "login", component: LoginComponent},
  {path: "payment/cancel", redirectTo:"menu", pathMatch: "full"},
  {path: "**", redirectTo: "/", pathMatch: "full"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
