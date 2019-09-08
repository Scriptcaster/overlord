import { Action } from '@ngrx/store';
import { Customer } from '../../shared/customer.model';
import * as CustomerListActions from './customer-list.actions';


const initialState = {
    customers:[
        new Customer('Steve Jobs', 'Founder of Apple')
    ]
};

export function customerListReducer(
    state = initialState, 
    action: CustomerListActions.CutomerListActions
) 
{
    switch (action.type) {
        case CustomerListActions.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload]
            };
        case CustomerListActions.ADD_CUSTOMERS:
            return {
                ...state,
                customers: [...state.customers, ...action.payload]
            };
        case CustomerListActions.UPDATE_CUSTOMER:
            const customer = state.customers[action.payload.index];
            const updatedCustomer = {
                ...customer,
                ...action.payload.customer
            };
            const updatedCustomers = [...state.customers];
            updatedCustomers[action.payload.index] = updatedCustomer;

            return {
                ...state,
                customers: updatedCustomers
            };
        case CustomerListActions.DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter((ig, igIndex) => {
                    return igIndex !== action.payload;
                })
            };
        default:
            return state;
    }
}