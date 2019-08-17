import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-list/document-item/document-item.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-list/customer-edit/customer-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { CustomerListService } from './customer-list/customer-list.service';
import { AppRoutingModule } from './app-routing.module';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentService } from './documents/document.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    CustomerListComponent,
    CustomerEditComponent,
    DropdownDirective,
    DocumentEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CustomerListService, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
