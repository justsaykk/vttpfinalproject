import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ListOfIngredients } from 'src/app/models/staticdata';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  listOfIngredients: string[] = ListOfIngredients;
  filteredOptions!: Observable<string[]>;
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private httpSvc: HttpService) { }

  ngOnInit(): void {
    this.createForm();
    this.filteredOptions = this.searchForm.controls["searchTerm"].valueChanges.pipe(
      startWith(''), map(v => this._filter(v || ''))
    )
  }

  private _filter(value: string): string[] {
    let filterValue = value.toLowerCase();
    return this.listOfIngredients.filter(search => search.toLowerCase().includes(filterValue))
  }

  createForm():void {
    this.searchForm = this.fb.group({
      searchTerm: this.fb.control('')
    })
  }

  onSubmit():void {
    this.httpSvc.loadMenu(this.searchForm.value.searchTerm)
    this.searchForm.reset();
  }

}
