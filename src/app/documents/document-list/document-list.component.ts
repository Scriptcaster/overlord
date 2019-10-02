import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Document } from '../document.model';
import * as fromApp from '../../store/app.reducer';
import * as DocumentActions from '../../documents/store/document.actions';

import { Animations } from '../documents.animations';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  animations: [ Animations.fade ]
})
export class DocumentListComponent implements OnInit, OnDestroy {
  @Input() childExample: boolean;
  @Output() animate = new EventEmitter<string>();

  documents: Document[];
  subscription: Subscription;
  isNewDocument = false;

  index: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(new DocumentActions.FetchDocuments());
    this.subscription = this.store
    .select('documents')
    .pipe(map(documentsState => documentsState.documents))
    .subscribe((documents: Document[]) => {
      this.documents = documents.sort((a,b) => (a.number < b.number ? 1 : -1));
    });
  }

  onNewDocument() {
    event.preventDefault();
    this.router.navigate(['new'], {relativeTo: this.route});
    if(!this.childExample) {
      this.animate.emit();
    }
  }

  onDocument(i) {
    // console.log('click');
    if(!this.childExample) {
      this.animate.emit();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
