import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DocumentsComponent } from './documents.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { DocumentsResolverService } from './document-resolver.service';
import { DocumentListComponent } from './document-list/document-list.component';

// const routes: Routes = [
//     { path: '', component: DocumentsComponent, canActivate: [AuthGuard],
//         children: [
//             // { path: '', component: DocumentListComponent },
//             { path: 'new', component: DocumentEditComponent },
//             { path: ':id', component: DocumentEditComponent, resolve: [DocumentsResolverService] },
//         ]
//     },
// ];

let routeMobile: Routes = [
    { path: '', component: DocumentsComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DocumentListComponent },
            { path: 'new', component: DocumentEditComponent },
            { path: ':id', component: DocumentEditComponent, resolve: [DocumentsResolverService] },
        ]
    },
];

let routeDesktop: Routes = [
    { path: '', component: DocumentsComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DocumentEditComponent },
            { path: 'new', component: DocumentEditComponent },
            { path: ':id', component: DocumentEditComponent, resolve: [DocumentsResolverService] },
        ]
    },
];

function checkForMobile(){
    if ( window.innerWidth < 450 ) {
        return true;
    } else {
        return false;
    }
}

let finalRoute = checkForMobile() ?  routeMobile : routeDesktop;  

@NgModule({
    imports: [RouterModule.forChild(finalRoute)],
    exports: [RouterModule]
})
export class DocumentsRoutingModule {}