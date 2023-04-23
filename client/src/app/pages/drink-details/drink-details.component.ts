import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription} from 'rxjs';
import { DetailedDrink } from 'src/app/models/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-drink-details',
  templateUrl: './drink-details.component.html',
  styleUrls: ['./drink-details.component.css']
})
export class DrinkDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private httpSvc: HttpService,
    private path: ActivatedRoute,
    private location: Location
  ) {}

  params$!: Subscription
  detailedDrink$!: Promise<DetailedDrink>
  detailedDrink!: DetailedDrink
  isLoading = true;
  ingredients: {ingredient: string, quantity: string}[] = [];
  displayedColumns: string[] = ["Ingredient", "Quantity"];

  async ngOnInit(){
    this.params$ = this.path.params.subscribe(async (params: Params) => { 
      this.detailedDrink = await this.httpSvc.getDrinksById(params["drinkId"]);
      console.log(this.detailedDrink)
      this.ingredients = Object.keys(this.detailedDrink)
        .filter(key =>  key != "idDrink" && 
                        key != "strDrink" &&
                        key != "strDrinkThumb" &&
                        key != "strDrinkImage" &&
                        key != "strInstructions"
        ).map(key => ({ingredient: key, quantity: this.detailedDrink[key]}))
        console.log(this.ingredients)
    })
  }

  ngOnDestroy(): void {
      this.params$.unsubscribe()
  }

  goBack(): void { this.location.back() }
}
