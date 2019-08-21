import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Customer } from '../shared/customer.model';
import { CustomerListService } from './customer-list.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styles: [``]
})
export class CustomerListComponent implements OnInit, OnDestroy {
  ingredients: Customer[];
  private subscription: Subscription;

  constructor(private customerListService: CustomerListService) { }

  ngOnInit() {
    this.ingredients = this.customerListService.getCustomers();
    this.subscription = this.customerListService.itemsChanged.subscribe(
      (ingredients: Customer[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.customerListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
