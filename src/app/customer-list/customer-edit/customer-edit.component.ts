import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Customer } from '../../shared/customer.model';
import { CustomerListService } from '../customer-list.service';

import { DataStorageService } from '../../shared/data-storage.service';
import { Store } from '@ngrx/store';

import * as CustomerListActions from '../store/customer-list.actions';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Customer;

  constructor(
    private costomerListService: CustomerListService,
    private dataStorageService: DataStorageService,
    private store: Store<{ customerList: { customers: Customer[]} }>
  ) {}

  ngOnInit() {
    this.dataStorageService.fetchCustomers().subscribe();
    this.subscription = this.costomerListService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.costomerListService.getCustomer(index);
        this.slForm.setValue({
          attn: this.editedItem.attn,
          customer: this.editedItem.customer
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newCustomer = new Customer(value.attn, value.customer);
    if (this.editMode) {
      // this.costomerListService.updateCustomer(this.editedItemIndex, newCustomer);
      this.store.dispatch(
        new CustomerListActions.UpdateCustomer({ 
          index: this.editedItemIndex, 
          customer: newCustomer 
        })
      );
    } else {
      // this.costomerListService.addCUstomer(newCustomer);
      this.store.dispatch(new CustomerListActions.AddCustomer(newCustomer));
    }
    this.dataStorageService.storeCustomers();
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // this.costomerListService.deleteCustomer(this.editedItemIndex);
    this.store.dispatch(
      new CustomerListActions.DeleteCustomer(this.editedItemIndex)
    );
    this.onClear();
    this.dataStorageService.storeCustomers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
