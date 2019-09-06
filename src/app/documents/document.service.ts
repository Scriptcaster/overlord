import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { Customer } from '../shared/customer.model';
import { CustomerListService } from '../customer-list/customer-list.service';

@Injectable()
export class DocumentService {
  documentsChanged = new Subject<Document[]>();
  private recipes: Document[] = [];

  constructor(private costomerListService: CustomerListService) {}

  setDocuments(recipes: Document[]) {
    this.recipes = recipes;
    this.documentsChanged.next(this.recipes.slice());
  }

  getDocuments() {
    return this.recipes.slice();
  }

  getDocument(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(customers: Customer[]) {
    this.costomerListService.addIngredients(customers);
  }

  addDocument(recipe: Document) {
    this.recipes.push(recipe);
    this.documentsChanged.next(this.recipes.slice());
  }

  updateDocument(index: number, newRecipe: Document) {
    this.recipes[index] = newRecipe;
    this.documentsChanged.next(this.recipes.slice());
  }

  deleteDocument(index: number) {
    this.recipes.splice(index, 1);
    this.documentsChanged.next(this.recipes.slice());
  }
}
