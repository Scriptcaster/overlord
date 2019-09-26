import { Component, OnInit, OnChanges, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';

import { Customer } from '../../../shared/customer.model';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html'
})
export class SelectCustomerComponent implements 
OnInit, 
OnChanges 
{

  @Input() attn: string;
  @Output() customer = new EventEmitter<{attn: string, customer: string}>();

  selectedCustomer: string;

  customers: Customer[];

  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>,) { console.log('select-customer constructor'); }

  ngOnInit() {
    console.log('select-customer ngOnInit()');
    this.subscription = this.store
    .select('customers')
    .pipe(map(customersState => customersState.customers))
    .subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('select-customer ngOnChanges()');
    console.log(changes);
    this.selectedCustomer = this.attn;
  }

  onUpdateCustomer() {
    console.log('select-customer onUpdateCustomer()');
    this.customers.forEach(customerDb => {
      if (customerDb.attn === this.selectedCustomer){
        this.customer.emit({ attn: customerDb.attn, customer: customerDb.customer });
      }
    });
  }

}
