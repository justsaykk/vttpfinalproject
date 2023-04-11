import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupCartComponent } from './components/popup-cart/popup-cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SuccessComponent } from './pages/success/success.component';
import { SearchComponent } from './components/search/search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OKTA_CONFIG, OktaAuthModule, OktaConfig} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginComponent } from './pages/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import myAppConfig from './config/my-app-config';
import { ProfileComponent } from './pages/profile/profile.component';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    RegistrationComponent,
    PopupCartComponent,
    CheckoutComponent,
    SuccessComponent,
    SearchComponent,
    LoginComponent,
    LoginStatusComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OktaAuthModule,
  ],
  providers: [
    {provide: OKTA_CONFIG, useValue: {oktaAuth}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
