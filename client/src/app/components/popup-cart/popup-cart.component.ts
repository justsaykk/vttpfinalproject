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
  title: string = "Orders"

  ngOnInit(): void {
    this.shoppingCart$ = this.cartSvc.getShoppingCartItems().subscribe(
      (cart) => {
        this.shoppingCart = cart;
      }
    )
  }

  ngOnDestroy(): void {
      this.shoppingCart$.unsubscribe();
  }

}
