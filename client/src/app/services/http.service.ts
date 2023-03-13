import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Drink } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BASE_URL: string = "http://localhost:8080/api"
  constructor(private http:HttpClient) { }

  // Section of Behavior Subjects
  private listOfDrinks = new BehaviorSubject<Drink[]>([]);

  // Getters & Setters
  public getListOfDrinks(): Observable<Drink[]> {
    return this.listOfDrinks;
  }

  // When /menu is hit, ngOnInit will call this method to load the menu items
  public loadMenu(ingredient: string): void {
    let searchUrl: string = this.BASE_URL + "/menu";
    let params = new HttpParams().set("ingredient", ingredient)

    this.http.get<{result: Drink[]}>(searchUrl, {params}).subscribe(
      r => this.listOfDrinks.next(r.result)
    )
  }
}
