import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private gitAuthEndpoint = "/oauth2/authorization/github";
  private gitTokenEndpoint = '/login/oauth2/code/github';
  private BACKEND = environment.BACKEND;
  private tokenKey = '';

  constructor(private http:HttpClient) { }

  login() {
    window.open(this.BACKEND + this.gitAuthEndpoint, '_self');
  }

  updateToken(token: any) {
    localStorage.setItem(this.tokenKey, token);
  }

  fetchToken(code:any, state:any): Observable<any> {
    return this.http.get(this.BACKEND + this.gitTokenEndpoint + '?code=' + code + '&state=' + state);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    let token = this.getToken();
    return token != null;
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  logout(): Observable<any> {
    return this.http.post(this.BACKEND + '/logout', this.getToken());
  }
}
