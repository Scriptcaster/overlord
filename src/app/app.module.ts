import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store'; // new rx way


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
// import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
// import { DocumentsModule } from './documents/documents.module';
// import { CustomerListModule } from './customer-list/customer-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { customerListReducer } from './customer-list/store/customer-list.reducer'; // new rx way
// import { LoggingService } from './logging.service';
// import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({customerList: customerListReducer}), // new rx way
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
