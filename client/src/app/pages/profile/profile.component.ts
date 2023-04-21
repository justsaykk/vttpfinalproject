import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionDetail, User } from 'src/app/models/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  transactions$!: Subscription
  transactions!: TransactionDetail[]
  currentUser$!: Subscription
  currentUser!: User
  panelOpenState = false;

  constructor(
    private httpSvc: HttpService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.httpSvc.getTransactionsByEmail();
    this.transactions$ = this.httpSvc.getTransactionsByEmail$().subscribe((r) => {this.transactions = r})
    this.currentUser$ = this.httpSvc.getProfile().subscribe(user => this.currentUser = user);   
  }

  ngOnDestroy(): void {
      this.transactions$.unsubscribe()
      this.currentUser$.unsubscribe()
  }

  goToEditProfilePage() {
    this.router.navigate(['/edit-profile'])
  }

}
