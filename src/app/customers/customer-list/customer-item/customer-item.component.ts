import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/shared/customer.model';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html'
})
export class CustomerItemComponent implements OnInit {
  @Input() customer: Customer;
  @Input() index: number;
  
  constructor() { }

  ngOnInit() {}

}
