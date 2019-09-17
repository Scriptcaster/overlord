import { ActionReducerMap } from '@ngrx/store';


import * as fromAuth from '../auth/store/auth.reducer';
import * as fromDocuments from '../documents/store/document.reducer';
import * as fromCustomers from '../customers/store/customer.reducer';


export interface AppState {
    auth: fromAuth.State;
    documents: fromDocuments.State;
    customers: fromCustomers.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    documents: fromDocuments.documentReducer,
    customers: fromCustomers.customerReducer,
};