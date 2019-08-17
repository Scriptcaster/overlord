import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Document } from '../documents/document.model';
import { DocumentService } from '../documents/document.service';

import { Ingredient } from './ingredient.model';
import { CustomerListService } from '../customer-list/customer-list.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient, 
    private recipeService: DocumentService,
    private customerListService: CustomerListService
  ) {}

  storeIngredients() {
    const ingredients = this.customerListService.getIngredients();
    this.http
      .put(
        'https://ng-oren.firebaseio.com/customers.json',
        ingredients
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-oren.firebaseio.com/documents.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchIngredients                                                                                                                                                                                                                                                                                                              () {
    return this.http
      .get<Ingredient[]>(
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

  fetchRecipes() {
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
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
