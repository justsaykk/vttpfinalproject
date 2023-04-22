import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable, switchMap } from 'rxjs';
import { CartItem, Drink, TransactionDetail, User } from '../models/models';
import { ShoppingcartService } from './shoppingcart.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // BASE_URL: string = "http://localhost:8080/api"
  BASE_URL: string = "https://drinkfactorybackend-production.up.railway.app/api"
  constructor(
    private http:HttpClient, 
    private cart: ShoppingcartService,
    private authSvc: AuthService,
    private router: Router,
    ) { }

  // Section of Behavior Subjects
  private _listOfDrinks = new BehaviorSubject<Drink[]>([]);
  private _searchIngredient = new BehaviorSubject<string>("rum");
  private _transactionsByEmail = new BehaviorSubject<TransactionDetail[]>([]);
  private _profile = new BehaviorSubject<User>({    
    email: "",
    name: "",
    profilePic: "",
    firebaseUID: ""})

  // Getters
  public getListOfDrinks$(): Observable<Drink[]> { return this._listOfDrinks }
  public getSearchIngredient$(): Observable<string> { return this._searchIngredient}
  public getTransactionsByEmail$(): Observable<TransactionDetail[]> {return this._transactionsByEmail}
  public getProfile(): Observable<User>{ return this._profile }
  public setSearchIngredients(ingredient: string): void { this._searchIngredient.next(ingredient) }

  // When /menu is hit, ngOnInit will call this method to load the menu items
  public loadMenu(ingredient: string): void {
    this.setSearchIngredients(ingredient)
    this._listOfDrinks.next([])
    let searchUrl: string = this.BASE_URL + "/menu";
    let params = new HttpParams().set("ingredient", ingredient)

    firstValueFrom(this.http.get<{result: Drink[]}>(searchUrl, {params}))
      .then((r) => { this._listOfDrinks.next(r.result) })
  }

  public postCart(): void {
    let postUrl: string = this.BASE_URL + "/create-checkout-session";
    let shoppingCart: CartItem[] = []
    this.cart.getCartItems().subscribe(
      (currentCart: CartItem[]) => {shoppingCart = currentCart}
    );

    let headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")

    firstValueFrom(this.http.post<{redirectUrl: string}>(postUrl, shoppingCart, {headers}))
      .then((res) => window.location.href = res.redirectUrl)
  }

  public async getTransactionsByEmail() {
    let url: string = `${this.BASE_URL}/profile/transactions`;
    let idToken = await firstValueFrom(this.authSvc.idToken$)
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${idToken}`)
      .set('Content-Type', "application/json")

    firstValueFrom( this.http.get<{data: TransactionDetail[]}>(url, {headers}))
      .then((r) => {this._transactionsByEmail.next(r.data)})
  }

  public async getProfilefromDb(): Promise<User> {
    let url: string = `${this.BASE_URL}/profile`;
    let idToken = await firstValueFrom(this.authSvc.idToken$)
    const headers: HttpHeaders = new HttpHeaders()
        .set('Authorization', `Bearer ${idToken}`)
        .set('Content-Type', "application/json")
    
    const user = await firstValueFrom(this.http.get<User>(url, {headers}))
    this._profile.next(user);
    return user;
  }

  public async editUser(user: User) {
    let url: string = `${this.BASE_URL}/profile`;
    let idToken = await firstValueFrom(this.authSvc.idToken$)

    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set('Authorization', `Bearer ${idToken}`)
      .set('Content-Type', "application/json")
      
    this.http.put(url, user, {headers})
  }
}
