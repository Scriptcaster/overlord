import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { Customer } from '../shared/customer.model';
import { CustomerListService } from '../customer-list/customer-list.service';

@Injectable()
export class DocumentService {
  recipesChanged = new Subject<Document[]>();
  private recipes: Document[] = [];

  constructor(private slService: CustomerListService) {}

  setRecipes(recipes: Document[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Customer[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Document) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Document) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
