import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PopupCartComponent } from './components/popup-cart/popup-cart.component';
import { Drink } from './models/models';
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
  isHidden = true
  routes = [
    {route: "/", name: "Home"},
    {route: "/menu", name: "Menu"},
    {route: "/userprofile", name: "User Profile"},
    {route: "/contactus", name: "Contact Us"},
  ]

  ngOnInit(): void {
      this.shoppingCart$ = this.cartSvc.getShoppingCartItems().subscribe(
        (cart) => {
          this.shoppingCart = cart;
          this.toggleBadgeVisibility();
        })
      this.isAuthenticated$ = this.authSvc.getIsAuthenticated().subscribe(
        (b) => { this.isAuthenticated = b })
  }

  ngOnDestroy(): void {
      this.shoppingCart$.unsubscribe();
      this.isAuthenticated$.unsubscribe();
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
