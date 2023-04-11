import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) { }

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (r) => {
        this.isAuthenticated = r.isAuthenticated!
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (r) => {
          this.userFullName = r.name as string
        }
      )
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
