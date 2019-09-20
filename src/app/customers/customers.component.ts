import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Customer } from '../shared/customer.model';
import { LoggingService } from '../logging.service';
import * as CustomersActions from './store/customer.actions';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styles: [``]
})
export class CustomersComponent implements OnInit, OnDestroy {
  // customers: Observable<{ customers: Customer[] }>
  customers: Customer[];
  subscription: Subscription;
  // private subscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    // this.customers = this.store.select('customers');
    // this.store.dispatch(new CustomersActions.FetchCustomers()); // from Server

    this.subscription = this.store
      .select('customers')
      .pipe(map(customersState => customersState.customers))
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
      });
    
    this.store.dispatch(new CustomersActions.FetchCustomers()); // my 
    // this.customers = this.store.select('customers');

    
    // this.store.select('customerList').subscribe(); //manual way
    // this.customers = this.customerListService.getCustomers();
    // this.subscription = this.customerListService.itemsChanged.subscribe(
    //   (customers: Customer[]) => {
    //     this.customers = customers;
    //   }
    // );

    // this.loggingService.printLog('Hello from CustomersComponent ngOnInit!');
  }

  onEditItem(index: number) {
    // this.customerListService.startedEditing.next(index);
    this.store.dispatch( new CustomersActions.StartEdit(index) );
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
