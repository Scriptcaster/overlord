import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit, OnDestroy {
  recipes: Document[];
  subscription: Subscription;

  constructor(
    private recipeService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
    ) {
  }

  ngOnInit() {
    this.dataStorageService.fetchDocuments().subscribe();
    this.subscription = this.recipeService.documentsChanged
      .subscribe(
        (recipes: Document[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getDocuments();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
