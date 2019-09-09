import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Document } from './document.model';
import { Customer } from '../shared/customer.model';
import * as CustomerListActions from '../customer-list/store/customer-list.actions';
import * as fromCustomerList from '../customer-list/store/customer-list.reducer';

@Injectable()
export class DocumentService {
  documentsChanged = new Subject<Document[]>();
  private recipes: Document[] = [];

  constructor(
    private store: Store<fromCustomerList.AppState>
  ) {}

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

  addCustomersToCustomerList(customers: Customer[]) {
    // this.costomerListService.addCustomers(customers);
    this.store.dispatch(new CustomerListActions.AddCustomers(customers));
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
