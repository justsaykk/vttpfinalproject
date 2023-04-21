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
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FirebaseAuthModule } from './shared/firebase-auth/firebase-auth.module';
import { LogoutMockComponent } from './shared/logout-mock/logout-mock.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { getStorage, provideStorage } from '@angular/fire/storage';
// External UI Modules
import { NgxShimmerLoadingModule } from  'ngx-shimmer-loading';

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
    ProfileComponent,
    LogoutMockComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FirebaseAuthModule,
    NgxShimmerLoadingModule,
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage())
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
