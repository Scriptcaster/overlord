import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Document } from '../documents/document.model';
import { DocumentService } from '../documents/document.service';

import { Customer } from './customer.model';
import { CustomerListService } from '../customer-list/customer-list.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient, 
    private recipeService: DocumentService,
    private customerListService: CustomerListService
  ) {}

  storeCustomers() {
    const ingredients = this.customerListService.getCustomers();
    this.http
      .put(
        'https://ng-oren.firebaseio.com/customers.json',
        ingredients
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  storeDocuments() {
    const recipes = this.recipeService.getDocuments();
    this.http
      .put(
        'https://ng-oren.firebaseio.com/documents.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchCustomers                                                                                                                                                                                                                                                                                                              () {
    return this.http
      .get<Customer[]>(
        'https://ng-oren.firebaseio.com/customers.json'
      )
      .pipe(
        map(ingredients => {
          return ingredients.map(ingredient => {
            return {
              ...ingredient,            };
          });
        }),
        tap(ingredients => {
          this.customerListService.setIngredients(ingredients);
        })
      )
  }

  fetchDocuments() {
    return this.http
      .get<Document[]>(
        'https://ng-oren.firebaseio.com/documents.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setDocuments(recipes);
        })
      )
  }
}
