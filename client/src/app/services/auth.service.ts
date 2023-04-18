import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, catchError, from, throwError } from 'rxjs';
import { HttpService } from './http.service';

type SignIn = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _idToken = new BehaviorSubject<string>("");

  constructor(private afAuth: AngularFireAuth) { 
    this.setAuthState();
  }

  // Getters
  public getIsAuthenticated() :Observable<boolean>{ return this._isAuthenticated };
  public getIdToken(): Observable<string> {return this._idToken};

  // Setters
  private setAuthState(): void {
    this.afAuth.authState.subscribe(
      (user) => { 
        this._isAuthenticated.next(!!user)
        if (!!user) { this.setIdToken() }
      });
  }
  private setIdToken():void {
    this.afAuth.idToken.subscribe(
      (token) => {this._idToken.next(token!)}
    )
  }

  // Functions
  public logout() { this.afAuth.signOut() }
  public login(params: SignIn): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(params.email, params.password))
    .pipe(
      catchError((error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))))
      );
  }

  public createUser(params: SignIn): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(params.email, params.password)).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      ));
  }

  private translateFirebaseErrorMessage({code, message}: FirebaseError) {
    switch (code) {
      case "auth/user-not-found":
        return "User not found.";

      case "auth/wrong-password":
        return "User not found.";

      case "auth/weak-password":
        return "Password needs to be stronger"

      default:
        break;
    }
   
    return message;
  }

}
