import { Document } from '../document.model';
import * as DocumentsActions from './document.actions';

export interface State {
  documents: Document[];
}

const initialState: State = {
  documents: []
};

export function documentReducer(
  state = initialState,
  action: DocumentsActions.DocumentsActions
) {
  switch (action.type) {
    case DocumentsActions.SET_DOCUMENTS:
      return {
        ...state,
        documents: [...action.payload]
      };
    case DocumentsActions.ADD_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload]
      };
    case DocumentsActions.UPDATE_DOCUMENT:
      const updatedDocument = {
        ...state.documents[action.payload.index],
        ...action.payload.newDocument
      };

      const updatedDocuments = [...state.documents];
      updatedDocuments[action.payload.index] = updatedDocument;

      return {
        ...state,
        documents: updatedDocuments
      };
    case DocumentsActions.DELETE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.filter((document, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
