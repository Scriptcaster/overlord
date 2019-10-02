import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomersComponent } from './customers.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';
import { CustomerItemComponent } from './customer-list/customer-item/customer-item.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';

@NgModule({
    declarations: [
        CustomersComponent,
        CustomerEditComponent,
        CustomerItemComponent,
        CustomerListComponent,

    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: '', component: CustomersComponent, canActivate: [AuthGuard] },
        ]),
        SharedModule,
        CustomersRoutingModule,
        ReactiveFormsModule
    ],
})
export class CustomersModule {}