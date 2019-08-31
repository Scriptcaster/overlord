import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
// import { api } from './api.service';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: 'auth', component: AuthComponent }]),
        SharedModule
    ],
    // providers: [
    //    ApiKey
    //   ]
})
export class AuthModule {}