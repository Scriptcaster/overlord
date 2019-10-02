import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Customer } from './customer.model';
import * as fromApp from '../store/app.reducer';
import * as CustomersActions from '../customers/store/customer.actions';

@Injectable({ providedIn: 'root' })
export class CustomersResolverService implements Resolve<Customer[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('customers').pipe(
      take(1),
      map(customersState => {
        return customersState.customers;
      }),
      switchMap(customers => {
        if (customers.length === 0) {
          this.store.dispatch(new CustomersActions.FetchCustomers());
          return this.actions$.pipe(
            ofType(CustomersActions.SET_CUSTOMERS),
            take(1)
          );
        } else {
          return of(customers);
        }
      })
    );
  }
}
