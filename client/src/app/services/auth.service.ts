import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, from, throwError } from 'rxjs';
import { User } from '../models/models';
import { Auth, UserCredential, authState, createUserWithEmailAndPassword, idToken, signInWithEmailAndPassword, user } from '@angular/fire/auth';

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
  private auth: Auth = inject(Auth)
  authState$ = authState(this.auth)
  idToken$ = idToken(this.auth)
  user$ = user(this.auth)


  constructor() { }
  
  // Functions
  public logout() { this.auth.signOut() }

  public login(params: SignIn): void{
    signInWithEmailAndPassword(this.auth, params.email, params.password).then(
      (creds: UserCredential) => console.log("Logged in with >> " + creds.user.email))
    .catch((error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))))

  }

  public createFirebaseUser(params: SignIn): void{
    createUserWithEmailAndPassword(this.auth, params.email, params.password)
    .then((creds: UserCredential) => console.log("Created and Logged in with >> " + creds.user.email))
    .catch((error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))))
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
