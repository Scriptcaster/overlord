import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Customer } from '../shared/customer.model';
import { LoggingService } from '../logging.service';
import * as fromCustomerList from './store/customer-list.reducer';
import * as CustomerListActions from './store/customer-list.actions';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styles: [``]
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers: Observable<{ customers: Customer[] }>
  // private subscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromCustomerList.AppState>
  ) { }

  ngOnInit() {
    this.customers = this.store.select('customerList');
    // this.store.select('customerList').subscribe(); //manual way
    // this.customers = this.customerListService.getCustomers();
    // this.subscription = this.customerListService.itemsChanged.subscribe(
    //   (customers: Customer[]) => {
    //     this.customers = customers;
    //   }
    // );

    this.loggingService.printLog('Hello from CustomerListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    // this.customerListService.startedEditing.next(index);
    this.store.dispatch( new CustomerListActions.StartEdit(index) );
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
