import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/models';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  
  constructor(
    private cartSvc: ShoppingcartService, 
  ) { }

  cartItems$!: Subscription
  cartItems!: CartItem[]

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

}
