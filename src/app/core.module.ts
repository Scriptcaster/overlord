import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomerListService } from './customer-list/customer-list.service';
import { DocumentService } from './documents/document.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';


@NgModule({
    providers: [
        CustomerListService, 
        DocumentService, 
        {
        provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptorService,
        multi: true
        }
    ]
})
export class CoreModule {}