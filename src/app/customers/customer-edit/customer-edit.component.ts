import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer } from '../../shared/customer.model';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as CustomersActions from '../store/customer.actions';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  // @ViewChild('f', { static: false }) slForm: NgForm;

  editMode = false;
  editedItem: Customer;

  id: number;
  customerForm: FormGroup;

  private subscription: Subscription;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private store: Store<fromApp.AppState>,
    private location: Location, 
  ) {}

  ngOnInit() {
    // console.log()
    //  this.f.setValue({
    //   attn: 'customer.attn',
    //   customer: 'customer.customer'
    // });    
    this.route.params.subscribe((params: Params) => {    
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      let customerAttn = '';
      let customerCustomer = '';
      if (this.editMode) {
       
        this.storeSub = this.store.select('customers').pipe(map(customerState => {
            return customerState.customers.find((customer, index) => {
              return index === this.id;
            })
        })).subscribe(customer => {
          customerAttn = customer.attn;
          customerCustomer = customer.customer;
          // console.log(this.slForm);
          // this.slForm.setValue({
          //   attn: customer.attn,
          //   customer: customer.customer
          // });    
        });
      }

      this.customerForm = new FormGroup({
        attn: new FormControl(customerAttn, Validators.required),
        customer: new FormControl(customerCustomer, Validators.required),
      });

    });
    // this.subscription = this.store.select('customers').subscribe(stateData => {
    //   if (stateData.editedCustomerIndex > -1) {
    //     this.editMode = true;
    //     this.editedItem = stateData.editedCustomer;
    //     this.slForm.setValue({
    //       attn: this.editedItem.attn,
    //       customer: this.editedItem.customer
    //     });    
    //   } else {
    //     this.editMode = false;
    //   }
    // });
  }

  // onSubmit(slForm: NgForm) {
  //   console.log(slForm.value);  // { first: '', last: '' }
  //   console.log(slForm.valid);  // false
  // }

  // onSubmit(form: NgForm) {
  //   const value = form.value;
  //   const newCustomer = new Customer(value.attn, value.customer);
  //   if (this.editMode) {
  //     this.store.dispatch(
  //       new CustomersActions.UpdateCustomer( newCustomer )
  //     );
  //   } else {
  //     this.store.dispatch(new CustomersActions.AddCustomer(newCustomer));
  //   }
  //   this.editMode = false;
  //   this.store.dispatch(new CustomersActions.StoreCustomers());
  //   form.reset();
  // }

   onSubmit() {
    event.preventDefault();
    if (this.editMode) {
      this.store.dispatch(
        new CustomersActions.UpdateCustomer({
          index: this.id,
          newCustomer: this.customerForm.value
        })
      );
    } else {
      this.store.dispatch(new CustomersActions.AddCustomer(this.customerForm.value));
    }
    // this.onCancel();
    this.store.dispatch(new CustomersActions.StoreCustomers());
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onCancel() {
    event.preventDefault();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onClear() {
    // this.slForm.reset();
    this.editMode = false;
    this.store.dispatch( new CustomersActions.StopEdit() );
  }
  onDelete() {
    event.preventDefault();
    this.store.dispatch(new CustomersActions.DeleteCustomer(this.id));
    this.store.dispatch(new CustomersActions.StoreCustomers()); 
    this.router.navigate(['/customers']);
  }
  // onDelete() {
  //   this.store.dispatch(new CustomersActions.DeleteCustomer());
  //   this.store.dispatch(new CustomersActions.StoreCustomers()); 
  //   this.onClear();
  // }

  goBack() {
    event.preventDefault();
    // this.location.back
    this.router.navigate(['/customers']);
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    // this.subscription.unsubscribe();
    this.store.dispatch( new CustomersActions.StopEdit() );
  }

}