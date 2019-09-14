import { ActionReducerMap } from '@ngrx/store';

import * as fromCustomerList from '../customer-list/store/customer-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromDocuments from '../documents/store/document.reducer';


export interface AppState {
    customerList: fromCustomerList.State;
    auth: fromAuth.State;
    documents: fromDocuments.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    customerList: fromCustomerList.customerListReducer,
    auth: fromAuth.authReducer,
    documents: fromDocuments.documentReducer
};