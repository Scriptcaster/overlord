import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DocumentsComponent } from './documents.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentItemComponent } from './document-list/document-item/document-item.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { CustomPipe } from './document-edit/custom.pipe';
import { DocumentsRoutingModule } from './documents-routing.module'
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        DocumentsComponent,
        DocumentListComponent,
        DocumentItemComponent,
        DocumentEditComponent,
        CustomPipe,
    ],
    imports: [
        RouterModule, 
        ReactiveFormsModule,
        DocumentsRoutingModule,
        SharedModule 
    ],
})
export class DocumentsModule {}