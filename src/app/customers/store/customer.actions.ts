import { Action } from '@ngrx/store';

import { Customer } from '../../shared/customer.model';

export const ADD_CUSTOMER = '[Customer List] Add Customer';
export const ADD_CUSTOMERS = '[Customer List] Add Customers';
export const UPDATE_CUSTOMER = '[Customer List] Update Customer';
export const DELETE_CUSTOMER = '[Customer List] Delete Customer';
export const START_EDIT = '[Customer List] Start Edit';
export const STOP_EDIT = '[Customer List] Stop Edit';

export const SET_CUSTOMERS = '[Customers] Set Customers';
export const FETCH_CUTOMERS = '[Customers] Fetch Customers';
export const STORE_CUSTOMERS = '[Customer] Store Customers';

export class AddCustomer implements Action {
    readonly type = ADD_CUSTOMER;

    constructor(public payload: Customer) {}
}

export class AddCustomers implements Action {
    readonly type = ADD_CUSTOMERS;

    constructor(public payload: Customer[]) {}
}

export class UpdateCustomer implements Action {
    readonly type = UPDATE_CUSTOMER;
    constructor(public payload: { index: number; newCustomer: Customer }) {}
}

export class DeleteCustomer implements Action {
    readonly type = DELETE_CUSTOMER;
    constructor(public payload: number) {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class SetCustomers implements Action {
    readonly type = SET_CUSTOMERS;
    constructor(public payload: Customer[]) {}
}

export class  FetchCustomers implements Action {
    readonly type = FETCH_CUTOMERS;
}

export class StoreCustomers implements Action {
    readonly type = STORE_CUSTOMERS;
}

export type CustomersActions = 
    AddCustomer | 
    AddCustomers | 
    UpdateCustomer | 
    DeleteCustomer |
    StartEdit |
    StopEdit |
    SetCustomers | 
    FetchCustomers | 
    StoreCustomers;