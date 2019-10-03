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

    userId: any;

    // fetchUser = this.store.select('auth').pipe(map(authState => 
    //     authState.user)).subscribe(user => {
    //         this.userId = user.id;
    //         console.log(this.userId);
    // });

    @Effect()
    fetchDocuments = this.actions$.pipe(
        ofType(DocumentsActions.FETCH_DOCUMENTS),
        switchMap(() => {

            this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
                if (user) this.userId = user.id;
            });

            return this.http.get<Document[]>(
            //   'https://ng-oren.firebaseio.com/documents.json'
              'https://ng-oren.firebaseio.com/users/' + this.userId + '/documents.json'
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

            this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
                if (user) this.userId = user.id;
            });

            return this.http.put(
              'https://ng-oren.firebaseio.com/users/' + this.userId + '/documents.json',
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