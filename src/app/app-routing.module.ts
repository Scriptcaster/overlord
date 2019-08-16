import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from './documents/documents.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { RecipesResolverService } from './documents/document-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: DocumentsComponent,
    children: [
      { path: 'new', component: DocumentEditComponent },
      {
        path: ':id',
        component: DocumentEditComponent,
        resolve: [RecipesResolverService]
      },
    ]
  },
  { path: 'customer-list', component: CustomerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}