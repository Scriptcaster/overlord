import { Customer } from '../../shared/customer.model';
import * as CustomersActions from './customer.actions';

export interface State {
    customers: Customer[];
    editedCustomer: Customer;
    editedCustomerIndex: number;
}

const initialState: State = {
    customers: [],
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
            const updatedCustomer = {
                ...state.customers[action.payload.index],
                ...action.payload.newCustomer
              };
        
              const updatedCustomers = [...state.customers];
              updatedCustomers[action.payload.index] = updatedCustomer;
        
              return {
                ...state,
                customers: updatedCustomers
              };
        case CustomersActions.DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter((customer, index) => {
                  return index !== action.payload;
                })
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