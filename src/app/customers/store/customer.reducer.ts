import { Action } from '@ngrx/store';
import { Customer } from '../../shared/customer.model';
import * as CustomersActions from './customer.actions';

export interface State {
    customers: Customer[];
    editedCustomer: Customer;
    editedCustomerIndex: number;
}

// export interface AppState {
//     Customers: State;
// }

const initialState: State = {
    customers: [],
    // customers:[ new Customer('Steve Jobs', 'Founder of Apple')],
    editedCustomer: null,
    editedCustomerIndex: -1 
};

export function customerReducer(
    state: State = initialState, 
    action: CustomersActions.CustomersActions
) 
{
    switch (action.type) {
        case CustomersActions.SET_CUSTOMERS:
            return {
              ...state,
              customers: [...action.payload]
            };
        case CustomersActions.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload]
            };
        case CustomersActions.ADD_CUSTOMERS:
            return {
                ...state,
                customers: [...state.customers, ...action.payload]
            };
        case CustomersActions.UPDATE_CUSTOMER:
            const customer = state.customers[state.editedCustomerIndex];
            const updatedCustomer = {
                ...customer,
                ...action.payload
            };
            const updatedCustomers = [...state.customers];
            updatedCustomers[state.editedCustomerIndex] = updatedCustomer;

            return {
                ...state,
                customers: updatedCustomers,
                editedCustomerIndex: -1,
                editedCustomer: null
            };
        case CustomersActions.DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter((ig, igIndex) => {
                    return igIndex !== state.editedCustomerIndex;
                }),
                editedCustomerIndex: -1,
                editedCustomer: null
            };
        case CustomersActions.START_EDIT:
            return {
                ...state,
                editedCustomerIndex: action.payload,
                editedCustomer: { ...state.customers[action.payload] }
            };
        case CustomersActions.STOP_EDIT:
            return {
                ...state,
                editedCustomer: null,
                editedCustomerIndex: -1
            };
        default:
            return state;
    }
}