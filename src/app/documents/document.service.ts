import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Document } from './document.model';
import { Customer } from '../shared/customer.model';
import { CustomerListService } from '../customer-list/customer-list.service';
import * as CustomerListActions from '../customer-list/store/customer-list.actions';

@Injectable()
export class DocumentService {
  documentsChanged = new Subject<Document[]>();
  private recipes: Document[] = [];

  constructor(
    private costomerListService: CustomerListService,
    private store: Store<{ customerList: { customers: Customer[]} }>
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
