import { Action } from '@ngrx/store';

import { Customer } from '../../shared/customer.model';

export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const ADD_CUSTOMERS = 'ADD_CUSTOMERS';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

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

    constructor( public payload: Customer ) {}
}

export class DeleteCustomer implements Action {
    readonly type = DELETE_CUSTOMER;

    // constructor(public payload: number) {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: number) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type CutomerListActions = 
    AddCustomer | 
    AddCustomers | 
    UpdateCustomer | 
    DeleteCustomer |
    StartEdit |
    StopEdit;