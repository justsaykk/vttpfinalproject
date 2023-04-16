import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure, FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private _snackBar: MatSnackBar,
    private location: Location,
  ) { 
    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
  }

  hide: boolean = true;
  form!: FormGroup;
  isAuthenticated$!: Subscription;
  isAuthenticated!: boolean;


  ngOnInit(): void {
    this.isAuthenticated$ = this.authSvc.getIsAuthenticated().subscribe((b) => this.isAuthenticated = b)
    if (!this.isAuthenticated) {this.createForm()} else {this.router.navigate(["/"])}
   }

  ngOnDestroy(): void {
      this.isAuthenticated$.unsubscribe();
  }
  
   login() {
    this.authSvc.login({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: error => {
        this._snackBar.open(error.message, "OK", {
          duration: 3000
        })
      }
    });
  }

  // Code for firebaseAuth UI
  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult){
    console.log(signInSuccessData)
    this.router.navigate(["/"]);
   }
    
  errorCallback(errorData: FirebaseUISignInFailure){
    console.log(errorData)
   }
  
  uiShownCallback() {
    console.log("UI is shown")
   }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
  goBack(): void {this.location.back()}

}
