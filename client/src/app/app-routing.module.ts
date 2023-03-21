import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { CancelComponent } from './pages/cancel/cancel.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SuccessComponent } from './pages/success/success.component';

const routes:Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "menu", component: MenuComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: "payment/success", component: SuccessComponent},
  {path: "callback", component: CallbackComponent},
  {path: "payment/cancel", redirectTo:"menu", pathMatch: "full"},
  {path: "**", redirectTo: "/", pathMatch: "full"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
