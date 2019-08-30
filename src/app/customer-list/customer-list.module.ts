import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CustomerListComponent } from './customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerEditComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { 
                path: 'customers', 
                component: CustomerListComponent,
                canActivate: [AuthGuard], 
              },
        ]),
        SharedModule
    ]
})
export class CustomerListModule {}