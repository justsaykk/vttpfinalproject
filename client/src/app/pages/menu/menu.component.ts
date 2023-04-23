import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { router } from 'ngx-bootstrap-icons';
import { Subscription } from 'rxjs';
import { Drink } from 'src/app/models/models';
import { HttpService } from 'src/app/services/http.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  constructor(
    private httpSvc: HttpService, 
    private _snackBar: MatSnackBar,
    private cartSvc: ShoppingcartService,
    private router: Router,
    ) { }

  // Subscriptions
  listOfDrinks$!: Subscription;
  queryIngredient$!: Subscription;
  isLoading$!: Subscription;
  
  // Properties
  listOfDrinks!: Drink[];
  queryIngredient!: string;
  currentPage: number = 1;
  

  ngOnInit(): void {
    this.listOfDrinks$ = this.httpSvc.getListOfDrinks$().subscribe(
      (r) => { this.listOfDrinks = r })
    this.queryIngredient$ = this.httpSvc.getSearchIngredient$().subscribe(
      (r) => { this.queryIngredient = r })
    this.httpSvc.loadMenu(this.queryIngredient);
      }

  ngOnDestroy(): void {
      this.listOfDrinks$.unsubscribe();
      this.queryIngredient$.unsubscribe();
  }

  addToCart(drink: Drink) {
    this.cartSvc.addToShoppingCart(drink)
    this._snackBar.open('Added to cart!', 'OK!', {duration: 3000})
  }

  goToDrinkDetail(idDrink: string) {
    this.router.navigate([`drink/${idDrink}`])
  }
}