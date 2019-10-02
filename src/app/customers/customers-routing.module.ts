import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CustomersComponent } from './customers.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomersResolverService } from './customer-resolver.service';
// import { CustomersResolverService } from './customer-resolver.service';
// import { CustomerListComponent } from './customer-list/customer-list.component';

// const routes: Routes = [
//     { path: '', component: CustomersComponent, canActivate: [AuthGuard],
//         children: [
//             // { path: '', component: CustomerListComponent },
//             { path: 'new', component: CustomerEditComponent },
//             { path: ':id', component: CustomerEditComponent, resolve: [CustomersResolverService] },
//         ]
//     },
// ];

let routeMobile: Routes = [
    { path: '', component: CustomersComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: CustomerListComponent },
            { path: 'new', component: CustomerEditComponent },
            { path: ':id', component: CustomerEditComponent, resolve: [CustomersResolverService] },
        ]
    },
];

let routeDesktop: Routes = [
    { path: '', component: CustomersComponent, canActivate: [AuthGuard],
        children: [
            // { path: '', component: CustomerListComponent },
            { path: 'new', component: CustomerEditComponent },
            { path: ':id', component: CustomerEditComponent, resolve: [CustomersResolverService]  },
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
export class CustomersRoutingModule {}