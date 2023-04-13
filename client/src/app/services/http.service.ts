import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, Subscription } from 'rxjs';
import { CartItem, Drink, TransactionDetail } from '../models/models';
import { ShoppingcartService } from './shoppingcart.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BASE_URL: string = "http://localhost:8080/api"
  constructor(private http:HttpClient, private cart: ShoppingcartService) { }

  // Section of Behavior Subjects
  private _listOfDrinks = new BehaviorSubject<Drink[]>([]);
  private _searchIngredient = new BehaviorSubject<string>("whiskey");
  private _transactionsByEmail = new BehaviorSubject<TransactionDetail[]>([]);

  // Getters & Setters
  public getListOfDrinks$(): Observable<Drink[]> { return this._listOfDrinks }
  public getSearchIngredient$(): Observable<string> { return this._searchIngredient}
  public getTransactionsByEmail$(): Observable<TransactionDetail[]> {return this._transactionsByEmail}

  // When /menu is hit, ngOnInit will call this method to load the menu items
  public loadMenu(ingredient: string): void {
    this._listOfDrinks.next([])
    let searchUrl: string = this.BASE_URL + "/menu";
    let params = new HttpParams().set("ingredient", ingredient)
    
    this.http.get<{result: Drink[]}>(searchUrl, {params}).subscribe(
      (r) => {
        this._listOfDrinks.next(r.result);
        this._searchIngredient.next(ingredient);
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

  public getTransactionsByEmail(email: string) {
    let url: string = `${this.BASE_URL}/profile/${email}`
    this.http.get<{data: TransactionDetail[]}>(url).subscribe(
      (r) => {
        this._transactionsByEmail.next(r.data)
      }
    )
  }
 }
