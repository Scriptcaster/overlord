import { Customer } from '../shared/customer.model';
import { Subject } from 'rxjs';

export class CustomerListService {
  itemsChanged = new Subject<Customer[]>();
  startedEditing = new Subject<number>();
  private customers: Customer[] = [];

  setCustomers(customers: Customer[]) {
    this.customers = customers;
    this.itemsChanged.next(this.customers.slice());
  }

  getCustomers() {
    return this.customers.slice();
  }

  getCustomer(index: number) {
    return this.customers[index];
  }

  addCustomer(customer: Customer) {
    this.customers.push(customer);
    this.itemsChanged.next(this.customers.slice());
  }

  addCustomers(customers: Customer[]) {
    this.customers.push(...customers);
    this.itemsChanged.next(this.customers.slice());
  }

  updateCustomer(index: number, newCustomer: Customer) {
    this.customers[index] = newCustomer;
    this.itemsChanged.next(this.customers.slice());
  }

  deleteCustomer(index: number) {
    this.customers.splice(index, 1);
    this.itemsChanged.next(this.customers.slice());
  }
}
