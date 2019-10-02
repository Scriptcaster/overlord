import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';


import { Customer } from '../shared/customer.model';
import { LoggingService } from '../logging.service';
import * as CustomersActions from './store/customer.actions';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styles: [``]
})
export class CustomersComponent implements OnInit {

  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
