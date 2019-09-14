import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Document } from './document.model';
import * as fromApp from '../store/app.reducer';
import * as DocumentsActions from '../documents/store/document.actions';

@Injectable({ providedIn: 'root' })
export class DocumentsResolverService implements Resolve<Document[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('documents').pipe(
      take(1),
      map(documentsState => {
        return documentsState.documents;
      }),
      switchMap(documents => {
        if (documents.length === 0) {
          this.store.dispatch(new DocumentsActions.FetchDocuments());
          return this.actions$.pipe(
            ofType(DocumentsActions.SET_DOCUMENTS),
            take(1)
          );
        } else {
          return of(documents);
        }
      })
    );
  }
}
