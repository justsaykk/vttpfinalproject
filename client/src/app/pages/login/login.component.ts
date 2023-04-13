import { Component, Inject, OnInit } from '@angular/core';
import myAppConfig from "../../config/my-app-config"
import { OKTA_AUTH } from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  oktaSignIn: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { 
    this.oktaSignIn = new OktaSignIn({
      logo: 'assets/logo.jpeg',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true, // Proof Key for Code Exchange
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      },
      idps: [
        {type: 'GOOGLE', id: '0oa92xth97BiJbVT95d7'},
        {type: 'GITHUB', id: '0oa92xr09xdcQ8JLI5d7'}
      ],
      idpDisplay: "SECONDARY"
    });
  }


  ngOnInit(): void {
    this.oktaSignIn.remove();
    this.oktaSignIn.renderEl({
      el: '#okta-sign-in-widget'},
      (res: any) => {
        if (res.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {throw error}
      )
  }

}
