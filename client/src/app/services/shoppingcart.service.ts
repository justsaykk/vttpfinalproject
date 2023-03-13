import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CartItem, Drink } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  constructor() { }
  private _shoppingCart = new BehaviorSubject<Drink[]>([])
  private _cartItems = new BehaviorSubject<CartItem[]>([])

  // Getters & Setters
  public getShoppingCartItems(): Observable<Drink[]> { return this._shoppingCart; }
  public getCartItems(): Observable<CartItem[]> { return this._cartItems; }


  public addToShoppingCart(drink: Drink): void {
    let shoppingCart: Drink[] = []
    let shoppingCart$!: Subscription
    shoppingCart$ = this.getShoppingCartItems().subscribe(
      (currentCart: Drink[]) => {shoppingCart = currentCart;}
    );
    shoppingCart$.unsubscribe()
    shoppingCart = [...shoppingCart,drink]
    this._shoppingCart.next(shoppingCart)
    this._cartItems.next(this.createCartItems(shoppingCart));
  }

  public removeFromShoppingCart(_drink: Drink): void {
    let shoppingCart: Drink[] = []
    let shoppingCart$!: Subscription
    shoppingCart$ = this.getShoppingCartItems().subscribe(
      (currentCart: Drink[]) => {shoppingCart = currentCart;}
    );
    shoppingCart$.unsubscribe()
    let idx = shoppingCart.findIndex(drink => _drink.idDrink === drink.idDrink);
    shoppingCart.splice(idx, 1);
    this._shoppingCart.next(shoppingCart)
    this._cartItems.next(this.createCartItems(shoppingCart));
  }

  private createCartItems(_shoppingCart: Drink[]): CartItem[] {
    if (!_shoppingCart.length) { return [] }
    let cartItems: CartItem[] = []
    _shoppingCart.map(
      (_drink: Drink) => {
        let index = cartItems.findIndex(drink => _drink.idDrink === drink.drink.idDrink);
        if ( !cartItems.length || index < 0 )
        { 
          cartItems.push({drink: _drink, quantity: 1} as CartItem) 
        } else {
          cartItems[index].quantity += 1;
        }
      }
    )
    return cartItems;
  }
}
