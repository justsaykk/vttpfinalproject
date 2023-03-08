import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Drink } from 'src/app/models/models';
import { ListOfIngredients } from 'src/app/models/staticdata';
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
    private cartSvc: ShoppingcartService
    ) { }

  listOfDrinks$!: Subscription;
  listOfDrinks!: Drink[]
  listOfIngredients = ListOfIngredients
  queryIngredient: string = "whiskey";


  ngOnInit(): void {
    this.httpSvc.loadMenu(this.queryIngredient);
    this.listOfDrinks$ = this.httpSvc.getListOfDrinks().subscribe(
      (r) => {this.listOfDrinks = r}
    )
  }

  ngOnDestroy(): void {
      this.listOfDrinks$.unsubscribe();
  }

  addToCart(drink: Drink) {
    this.cartSvc.addToCart(drink)
    this._snackBar.open('Added to cart!', 'OK!', {duration: 3000})
  }
}