import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Customer } from '../../shared/customer.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { Store } from '@ngrx/store';

import * as CustomerListActions from '../store/customer-list.actions';
import * as fromCustomerList from '../store/customer-list.reducer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Customer;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromCustomerList.AppState>
  ) {}

  ngOnInit() {
    this.dataStorageService.fetchCustomers().subscribe();
    this.subscription = this.store.select('customerList').subscribe(stateData => {
      if (stateData.editedCustomerIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedCustomer;
        // this.editedItemIndex = stateData.editedCustomerIndex;
        this.slForm.setValue({
          attn: this.editedItem.attn,
          customer: this.editedItem.customer
        });
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.costomerListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.costomerListService.getCustomer(index);
    //     this.slForm.setValue({
    //       attn: this.editedItem.attn,
    //       customer: this.editedItem.customer
    //     })
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newCustomer = new Customer(value.attn, value.customer);
    if (this.editMode) {
      // this.costomerListService.updateCustomer(this.editedItemIndex, newCustomer);
      this.store.dispatch(
        new CustomerListActions.UpdateCustomer( newCustomer )
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
    this.store.dispatch( new CustomerListActions.StopEdit() );
  }

  onDelete() {
    // this.costomerListService.deleteCustomer(this.editedItemIndex);
    this.store.dispatch(
      new CustomerListActions.DeleteCustomer()
    );
    this.onClear();
    this.dataStorageService.storeCustomers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch( new CustomerListActions.StopEdit() );
  }

}
