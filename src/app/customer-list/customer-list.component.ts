import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Customer } from '../shared/customer.model';
import { CustomerListService } from './customer-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styles: [``]
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers: Customer[];
  private subscription: Subscription;

  constructor(private customerListService: CustomerListService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.customers = this.customerListService.getCustomers();
    this.subscription = this.customerListService.itemsChanged.subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      }
    );

    this.loggingService.printLog('Hello from CustomerListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    this.customerListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
