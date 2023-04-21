import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, catchError, from, throwError } from 'rxjs';
import { User } from '../models/models';

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
  private currentUser: any = null;
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _idToken = new BehaviorSubject<string>("");
  private _currentUser = new BehaviorSubject<User>({
    email: "",
    name: "",
    profilePic: "",
    firebaseUID: "",
  })

  constructor(private afAuth: AngularFireAuth) {
    this.setAuthState();
  }
  
  // Getters
  public getIsAuthenticated() :Observable<boolean>{ return this._isAuthenticated };
  public getIdToken(): Observable<string> {return this._idToken};
  public getCurrentUser(): Observable<User> { return this._currentUser };

  // Setters
  public setAuthState(): void {
    this.afAuth.authState.subscribe(
      (user) => {
        this.currentUser = user; 
        this._isAuthenticated.next(!!user);
        if (!!user) { 
          this.setIdToken();
          this.setCurrentUser();
         }
      });
  }
  public setIdToken():void {
    this.afAuth.idToken.subscribe(
      (token) => {this._idToken.next(token!)}
    )
  }
  public setCurrentUser(): void {
    this._currentUser.next({
      email: this.currentUser.email,
      name: this.currentUser.displayName ? this.currentUser.displayName : this.currentUser.email.split('@')[0],
      profilePic: this.currentUser.photoURL ? this.currentUser.photoURL : "assets/stock-profile-photo.jpeg",
      firebaseUID: this.currentUser.uid
    })
  }

  // Functions
  public logout() { 
    this.afAuth.signOut();
    this.setAuthState();
  }
  public login(params: SignIn): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(params.email, params.password))
    .pipe(
      catchError((error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))))
      );
  }

  public createFirebaseUser(params: SignIn): Observable<any> {
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
