import { Location } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  form!: FormGroup
  hide: boolean = true;
  isAuthenticated$!: Subscription;
  isAuthenticated!: boolean;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private location: Location,
    private authSvc: AuthService,
    ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authSvc.authState$.subscribe((u) => this.isAuthenticated = !!u)
    if (!this.isAuthenticated) {this.createForm()} else {this.router.navigate(["/"])}
   }

  ngOnDestroy(): void { this.isAuthenticated$.unsubscribe() }
  goBack(): void {this.location.back()}


   createForm() {
     this.form = this.fb.group({
       email: this.fb.control('', [Validators.required, Validators.email]),
       password: this.fb.control('', [Validators.required]),
     })
   }

   createUser() {
    this.authSvc.createFirebaseUser({
      email: this.form.value.email,
      password: this.form.value.password
    }) 
    this.router.navigate(['/'])
  }
  
}
