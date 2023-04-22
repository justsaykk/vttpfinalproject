import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PopupCartComponent } from './components/popup-cart/popup-cart.component';
import { Drink, User } from './models/models';
import { ShoppingcartService } from './services/shoppingcart.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(
    private router: Router,
    private cartSvc: ShoppingcartService,
    private popUpCart: MatDialog,
    private authSvc: AuthService,
    private _snackBar: MatSnackBar,
    ) { }

  title = 'Drink Factory';
  shoppingCart$!: Subscription;
  isAuthenticated$!: Subscription;
  currentUser$!: Subscription;
  shoppingCart!: Drink[]
  isAuthenticated!: boolean;
  currentUserEmail!: string | null | undefined
  isHidden = true

  ngOnInit(): void {
      this.shoppingCart$ = this.cartSvc.getShoppingCartItems().subscribe(
        (cart) => {
          this.shoppingCart = cart;
          this.toggleBadgeVisibility();
        })
      this.isAuthenticated$ = this.authSvc.authState$.subscribe((user) => this.isAuthenticated = !!user)
      this.currentUser$ = this.authSvc.user$.subscribe((user) => this.currentUserEmail = user?.email)
  }

  ngOnDestroy(): void {
      this.shoppingCart$.unsubscribe();
      this.isAuthenticated$.unsubscribe();
      this.currentUser$.unsubscribe();
  }

  toggleBadgeVisibility() {
    this.isHidden = this.shoppingCart.length > 0 ? false : true;
  }

  openPopUpCart() {
    this.popUpCart.open(PopupCartComponent)
  }

  logout() { 
    this.authSvc.logout();
    this._snackBar.open('You are logged out!', 'Okie!', {duration: 3000})
    this.router.navigate(["/"])
  }
}
