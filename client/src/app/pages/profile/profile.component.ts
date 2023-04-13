import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { TransactionDetail } from 'src/app/models/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  transactions$!: Subscription
  transactions!: TransactionDetail[]
  email!: string

  constructor(private httpSvc: HttpService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.email = params['email'])
    this.httpSvc.getTransactionsByEmail(this.email);
    this.transactions$ = this.httpSvc.getTransactionsByEmail$().subscribe(
      (r) => {
        this.transactions = r;
        console.log(this.transactions)
      })
  }

  ngOnDestroy(): void {
      this.transactions$.unsubscribe()
  }

}
