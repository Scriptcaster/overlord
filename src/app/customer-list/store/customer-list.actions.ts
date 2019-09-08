import { Action } from '@ngrx/store';

import { Customer } from '../../shared/customer.model';

export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const ADD_CUSTOMERS = 'ADD_CUSTOMERS';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';

export class AddCustomer implements Action {
    readonly type = ADD_CUSTOMER;
    // payload: Customer;

    constructor(public payload: Customer) {}
}

export class AddCustomers implements Action {
    readonly type = ADD_CUSTOMERS;

    constructor(public payload: Customer[]) {}
}

export class UpdateCustomer implements Action {
    readonly type = UPDATE_CUSTOMER;

    constructor(public payload: {index: number, customer: Customer}) {}
}

export class DeleteCustomer implements Action {
    readonly type = DELETE_CUSTOMER;

    constructor(public payload: number) {}
}

export type CutomerListActions = AddCustomer | AddCustomers | UpdateCustomer | DeleteCustomer;