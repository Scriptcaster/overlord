import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DocumentsComponent } from './documents.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { DocumentsResolverService } from './document-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: DocumentsComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'new', component: DocumentEditComponent },
            {
            path: ':id',
            component: DocumentEditComponent,
            resolve: [DocumentsResolverService]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentsRoutingModule {}