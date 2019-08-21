import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from './documents/documents.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentsResolverService } from './documents/document-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  {
    path: 'documents',
    component: DocumentsComponent,
    children: [
      { path: 'new', component: DocumentEditComponent },
      {
        path: ':id',
        component: DocumentEditComponent,
        resolve: [DocumentsResolverService]
      },
    ]
  },
  { path: 'customers', component: CustomerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}