import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Customer } from '../../shared/customer.model';
import { Store } from '@ngrx/store';

import * as CustomersActions from '../store/customer.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Customer;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store.select('customers').subscribe(stateData => {
      if (stateData.editedCustomerIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedCustomer;
        this.slForm.setValue({
          attn: this.editedItem.attn,
          customer: this.editedItem.customer
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newCustomer = new Customer(value.attn, value.customer);
    if (this.editMode) {
      this.store.dispatch(
        new CustomersActions.UpdateCustomer( newCustomer )
      );
    } else {
      this.store.dispatch(new CustomersActions.AddCustomer(newCustomer));
    }
    this.editMode = false;
    this.store.dispatch(new CustomersActions.StoreCustomers());
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch( new CustomersActions.StopEdit() );
  }

  onDelete() {
    this.store.dispatch(new CustomersActions.DeleteCustomer());
    this.store.dispatch(new CustomersActions.StoreCustomers()); 
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch( new CustomersActions.StopEdit() );
  }

}
