import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CustomersComponent } from './customers.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        CustomersComponent,
        CustomerEditComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: '', component: CustomersComponent, canActivate: [AuthGuard] },
        ]),
        SharedModule
    ],
    // providers: [LoggingService]
})
export class CustomersModule {}