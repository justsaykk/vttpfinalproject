import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) { }

  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  public getIsAuthenticated() :Observable<boolean>{
    let auth$ = this.afAuth.authState.subscribe(
      (user) => { this._isAuthenticated.next(!!user)});
    return this._isAuthenticated
  }

  public logout() {
    this.afAuth.signOut();
  }
}
