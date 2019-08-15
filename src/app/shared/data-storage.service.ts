import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  storeIngredients() {
    const ingredients = this.shoppingListService.getIngredients();
    this.http
      .put(
        'https://ng-course-recipe-book-2ccd7.firebaseio.com/customers.json',
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
        'https://ng-course-recipe-book-2ccd7.firebaseio.com/documents.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchIngredients                                                                                                                                                                                                                                                                                                              () {
    return this.http
      .get<Ingredient[]>(
        'https://ng-course-recipe-book-2ccd7.firebaseio.com/customers.json'
      )
      .pipe(
        map(ingredients => {
          return ingredients.map(ingredient => {
            return {
              ...ingredient,            };
          });
        }),
        tap(ingredients => {
          this.shoppingListService.setIngredients(ingredients);
        })
      )
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-2ccd7.firebaseio.com/documents.json'
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
