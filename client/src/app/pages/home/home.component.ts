import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private authSvc: AuthService) { }

  isAuthenticated$!: Subscription;
  isAuthenticated!: boolean

  ngOnInit(): void {
    this.isAuthenticated$ = this.authSvc.authState$.subscribe((user) => this.isAuthenticated = !!user)
  }

  ngOnDestroy(): void {
      this.isAuthenticated$.unsubscribe();
  }

}
