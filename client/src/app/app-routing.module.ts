import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SuccessComponent } from './pages/success/success.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LogoutMockComponent } from './shared/logout-mock/logout-mock.component';
import { authGuard } from './services/auth.guard';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { DrinkDetailsComponent } from './pages/drink-details/drink-details.component';
import { AboutComponent } from './pages/about/about.component';

const routes:Routes = [
  {path: "", component: HomeComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "menu", component: MenuComponent},
  {path: "payment/success", component: SuccessComponent},
  {path: "login", component: LoginComponent},
  {path: "drink/:drinkId", component: DrinkDetailsComponent},
  {path: "about", component: AboutComponent},
  {path: "profile",component: ProfileComponent, canActivate: [authGuard]},
  {path: "edit-profile",component: EditProfileComponent, canActivate: [authGuard]},
  {path: "payment/cancel", redirectTo:"menu", pathMatch: "full"},
  {path: "logout", component: LogoutMockComponent},
  {path: "**", redirectTo: "/", pathMatch: "full"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
