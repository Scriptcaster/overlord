import { Action } from '@ngrx/store';

import { Document } from '../document.model';

export const SET_DOCUMENTS = '[Documents] Set Documents';
export const FETCH_DOCUMENTS = '[Documents] Fetch Documents';
export const ADD_DOCUMENT = '[Document] Add Document';
export const UPDATE_DOCUMENT = '[Document] Update Document';
export const DELETE_DOCUMENT = '[Document] Delete Document';
export const STORE_DOCUMENTS = '[Document] Store Documents';

export class SetDocuments implements Action {
    readonly type = SET_DOCUMENTS;

    constructor(public payload: Document[]) {}
}

export class  FetchDocuments implements Action {
    readonly type = FETCH_DOCUMENTS;
}

export class AddDocument implements Action {
    readonly type = ADD_DOCUMENT;
  
    constructor(public payload: Document) {}
  }
  
  export class UpdateDocument implements Action {
    readonly type = UPDATE_DOCUMENT;
  
    constructor(public payload: { index: number; newDocument: Document }) {}
  }
  
  export class DeleteDocument implements Action {
    readonly type = DELETE_DOCUMENT;
  
    constructor(public payload: number) {}
  }
  
  export class StoreDocuments implements Action {
    readonly type = STORE_DOCUMENTS;
  }

export type DocumentsActions =
  | SetDocuments
  | FetchDocuments
  | AddDocument
  | UpdateDocument
  | DeleteDocument
  | StoreDocuments;
