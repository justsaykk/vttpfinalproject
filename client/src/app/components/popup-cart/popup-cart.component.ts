import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/models';
import { HttpService } from 'src/app/services/http.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';

@Component({
  selector: 'app-popup-cart',
  templateUrl: './popup-cart.component.html',
  styleUrls: ['./popup-cart.component.css']
})
export class PopupCartComponent implements OnInit, OnDestroy {
  constructor(
    private cartSvc: ShoppingcartService,
    private httpSvc: HttpService 
  ) { }

  cartItems$!: Subscription
  cartItems!: CartItem[]
  isLoading = false;
  title: string = "Orders"

  ngOnInit(): void {
    this.cartItems$ = this.cartSvc.getCartItems().subscribe(
      (cart) => {
        this.cartItems = cart;
      }
    )
  }

  ngOnDestroy(): void {
      this.cartItems$.unsubscribe();
  }

  public removeFromCartItems(item: CartItem): void {
    this.cartSvc.removeFromShoppingCart(item.drink);
  }

  public pay(): void {
    this.isLoading = true;
    this.httpSvc.postCart()
  }
}