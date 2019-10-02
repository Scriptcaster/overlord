import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Customer } from '../../shared/customer.model';
import { LoggingService } from '../../logging.service';
import * as CustomersActions from '../store/customer.actions';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  @Input() childExample: boolean;
  @Output() animate = new EventEmitter<string>();
  
  customers: Customer[];
  subscription: Subscription;

  index: number;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.store
      .select('customers')
      .pipe(map(customersState => customersState.customers))
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
    });
    
    this.store.dispatch(new CustomersActions.FetchCustomers()); // my
  }

  onNewCustomer() {
    event.preventDefault();
    this.router.navigate(['new'], {relativeTo: this.route});
    if(!this.childExample) {
      this.animate.emit();
    }
  }

  goBack() {
    event.preventDefault();
    this.location.back();
  }

  onCustomer(i) {
    // console.log('click');
    // this.store.dispatch( new CustomersActions.StartEdit(index) );
    if(!this.childExample) {
      this.animate.emit();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
