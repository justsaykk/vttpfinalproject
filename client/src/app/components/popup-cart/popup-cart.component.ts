import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Drink } from 'src/app/models/models';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';

@Component({
  selector: 'app-popup-cart',
  templateUrl: './popup-cart.component.html',
  styleUrls: ['./popup-cart.component.css']
})
export class PopupCartComponent implements OnInit, OnDestroy {
  constructor(
    private cartSvc: ShoppingcartService, 
  ) { }

  shoppingCart$!: Subscription;
  shoppingCart!: Drink[]
  cartItems: CartItem[] = []
  title: string = "Orders"

  ngOnInit(): void {
    this.shoppingCart$ = this.cartSvc.getShoppingCartItems().subscribe(
      (cart) => {
        this.shoppingCart = cart;
      }
    )
      this.toCartItem(this.shoppingCart);
  }

  ngOnDestroy(): void {
      this.shoppingCart$.unsubscribe();
  }

  private toCartItem(_shoppingCart: Drink[]) {
    console.log("toCartItem start");
    
    if (!_shoppingCart.length) {
      console.log("Shopping cart is empty");
      return
    }

    _shoppingCart.map(
      (_drink: Drink) => {
        let index = this.cartItems.findIndex(el => _drink.idDrink === el.drink.idDrink);
        if ( !this.cartItems.length || index < 0 )
        { this.cartItems.push({drink: _drink, quantity: 1} as CartItem)
          return 
        }
        this.cartItems[index].quantity += 1;
        return
      }
    )
  }
}

export interface CartItem {
  drink: Drink
  quantity: number
}