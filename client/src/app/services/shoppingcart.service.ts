import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Drink } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  constructor() { }
  private cartSubject = new BehaviorSubject<Drink[]>([])

  // Getters & Setters
  public getShoppingCartItems(): Observable<Drink[]> {
    return this.cartSubject;
  }

  public addToCart(drink: Drink): void {
    let cart: Drink[] = []
    let cart$!: Subscription
    cart$ = this.getShoppingCartItems().subscribe(
      (currentCart: Drink[]) => {cart = currentCart;}
    );
    cart$.unsubscribe()
    this.cartSubject.next([...cart,drink])
  }
}
