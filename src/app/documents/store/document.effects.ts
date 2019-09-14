import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as DocumentsActions from './document.actions';
import { Document } from '../document.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class DocumentEffects {
    @Effect()
    fetchDocuments = this.actions$.pipe(
        ofType(DocumentsActions.FETCH_DOCUMENTS),
        switchMap(() => {
            return this.http
            .get<Document[]>(
              'https://ng-oren.firebaseio.com/documents.json'
            );
        }),
        map(documents => {
            return documents.map(document => {
                return {
                ...document,
                customers: document.customers ? document.customers : []
                };
            });
        }),
        map(documents => {
            return new DocumentsActions.SetDocuments(documents);
        })
    );
    
    @Effect({dispatch: false})
    storeDocuments = this.actions$.pipe(
        ofType(DocumentsActions.STORE_DOCUMENTS),
        withLatestFrom(this.store.select('documents')),
        switchMap(([actionData, documentsState]) => {
            return this.http.put(
              'https://ng-oren.firebaseio.com/documents.json',
              documentsState.documents
            )
        })

    );

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private store: Store<fromApp.AppState>
    ) {}
}