import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        CommonModule
    ],
    entryComponents: [AlertComponent],
    providers: [LoggingService]
})
export class SharedModule {}