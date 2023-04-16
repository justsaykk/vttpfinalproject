import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, catchError, from, throwError } from 'rxjs';

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
  constructor(private afAuth: AngularFireAuth) { }

  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  public getIsAuthenticated() :Observable<boolean>{
    this.afAuth.authState.subscribe(
      (user) => { this._isAuthenticated.next(!!user)});
    return this._isAuthenticated
  }

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

  public logout() {
    this.afAuth.signOut();
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
