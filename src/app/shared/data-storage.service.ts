import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Document } from '../documents/document.model';
import { DocumentService } from '../documents/document.service';

import { Customer } from './customer.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient, 
    private documentService: DocumentService,
    private authService: AuthService
  ) {}

  storeCustomers() {
    const customers = [];
    this.http
      .put(
        'https://ng-oren.firebaseio.com/customers.json',
        customers
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  storeDocuments() {
    const documents = this.documentService.getDocuments();
    this.http
      .put(
        'https://ng-oren.firebaseio.com/documents.json',
        documents
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchCustomers                                                                                                                                                                                                                                                                                                              () {
    return this.http
      .get<Customer[]>(
        'https://ng-oren.firebaseio.com/customers.json'
      )
      .pipe(
        map(customers => {
          return customers.map(customer => {
            return {
              ...customer,            };
          });
        }),
        tap(customers => {
          // this.customerListService.setCustomers(customers);
        })
      )
  }

  fetchDocuments() {
    return this.http.get<Document[]>(
      // 'https://ng-oren.firebaseio.com/documents.json?auth='
      'https://ng-oren.firebaseio.com/documents.json'
    ).pipe(
      map(documents => {
        return documents.map(document => {
          return {
            ...document,
            // customers: document.customers ? document.customers : []
          };
        });
      }),
      tap(documents => {
        this.documentService.setDocuments(documents);
      })
    );
  }
}
