import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PopupCartComponent } from './components/popup-cart/popup-cart.component';
import { Drink } from './models/models';
import { ShoppingcartService } from './services/shoppingcart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(
    private cartSvc: ShoppingcartService,
    private popUpCart: MatDialog) { }

  title = 'Drink Factory';
  shoppingCart$!: Subscription;
  shoppingCart!: Drink[]
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
        }
      )
  }

  ngOnDestroy(): void {
      this.shoppingCart$.unsubscribe();
  }

  toggleBadgeVisibility() {
    this.shoppingCart.length ? this.isHidden = false : this.isHidden = true
  }

  openPopUpCart() {
    this.popUpCart.open(PopupCartComponent)
  }

}
