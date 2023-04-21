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
  shoppingCart!: Drink[]
  isAuthenticated$!: Subscription;
  isAuthenticated!: boolean;
  currentUser$!: Subscription;
  currentUser!: User;
  isHidden = true

  ngOnInit(): void {
      this.shoppingCart$ = this.cartSvc.getShoppingCartItems().subscribe(
        (cart) => {
          this.shoppingCart = cart;
          this.toggleBadgeVisibility();
        })
      this.isAuthenticated$ = this.authSvc.getIsAuthenticated().subscribe((b) => { this.isAuthenticated = b })
      this.currentUser$ = this.authSvc.getCurrentUser().subscribe(user => this.currentUser = user)
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
