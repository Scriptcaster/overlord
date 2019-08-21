import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Customer } from '../../shared/customer.model';
import { CustomerListService } from '../customer-list.service';

import { DataStorageService } from '../../shared/data-storage.service';


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
    private dataStorageService: DataStorageService
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
    const newIngredient = new Customer(value.attn, value.customer);
    if (this.editMode) {
      this.costomerListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.costomerListService.addIngredient(newIngredient);
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
    this.costomerListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
    this.dataStorageService.storeCustomers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
