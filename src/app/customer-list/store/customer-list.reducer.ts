import { Action } from '@ngrx/store';
import { Customer } from '../../shared/customer.model';
import * as CustomerListActions from './customer-list.actions';

export interface State {
    customers: Customer[];
    editedCustomer: Customer;
    editedCustomerIndex: number;
}

// export interface AppState {
//     customerList: State;
// }

const initialState: State = {
    customers:[ new Customer('Steve Jobs', 'Founder of Apple')],
    editedCustomer: null,
    editedCustomerIndex: -1 
};

export function customerListReducer(
    state: State = initialState, 
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
        case CustomerListActions.DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter((ig, igIndex) => {
                    return igIndex !== state.editedCustomerIndex;
                }),
                editedCustomerIndex: -1,
                editedCustomer: null
            };
        case CustomerListActions.START_EDIT:
            return {
                ...state,
                editedCustomerIndex: action.payload,
                editedCustomer: { ...state.customers[action.payload] }
            };
        case CustomerListActions.STOP_EDIT:
            return {
                ...state,
                editedCustomer: null,
                editedCustomerIndex: -1
            };
        default:
            return state;
    }
}