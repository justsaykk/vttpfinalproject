import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, Subscription } from 'rxjs';
import { CartItem, Drink } from '../models/models';
import { ShoppingcartService } from './shoppingcart.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BASE_URL: string = "http://localhost:8080/api"
  constructor(private http:HttpClient, private cart: ShoppingcartService) { }

  // Section of Behavior Subjects
  private listOfDrinks = new BehaviorSubject<Drink[]>([]);
  private searchIngredient = new BehaviorSubject<string>("whiskey");

  // Getters & Setters
  public getListOfDrinks(): Observable<Drink[]> { return this.listOfDrinks }
  public getSearchIngredient(): Observable<string> { return this.searchIngredient}

  // When /menu is hit, ngOnInit will call this method to load the menu items
  public loadMenu(ingredient: string): void {
    this.listOfDrinks.next([])
    let searchUrl: string = this.BASE_URL + "/menu";
    let params = new HttpParams().set("ingredient", ingredient)
    this.http.get<{result: Drink[]}>(searchUrl, {params}).subscribe(
      (r) => {
        this.listOfDrinks.next(r.result);
        this.searchIngredient.next(ingredient);
      }
    )
  }

  public postCart(): void {
    let postUrl: string = this.BASE_URL + "/create-checkout-session";
    let shoppingCart: CartItem[] = []
    let shoppingCart$!: Subscription
    shoppingCart$ = this.cart.getCartItems().subscribe(
      (currentCart: CartItem[]) => {shoppingCart = currentCart;}
    );
    shoppingCart$.unsubscribe()

    let headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")

    firstValueFrom(
      this.http.post<{redirectUrl: string}>(postUrl, shoppingCart, {headers}))
      .then((res) => window.location.href = res.redirectUrl)
    }
 }
