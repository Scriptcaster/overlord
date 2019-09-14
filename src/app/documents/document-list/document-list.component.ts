import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Document } from '../document.model';
import * as fromApp from '../../store/app.reducer';
import * as DocumentActions from '../../documents/store/document.actions';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    ) {
  }

  ngOnInit() {
    this.subscription = this.store
      .select('documents')
      .pipe(map(documentsState => documentsState.documents))
      .subscribe((documents: Document[]) => {
        this.documents = documents;
      });
      this.store.dispatch(new DocumentActions.FetchDocuments()); // my
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
