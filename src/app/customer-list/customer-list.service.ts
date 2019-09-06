import { Customer } from '../shared/customer.model';
import { Subject } from 'rxjs';

export class CustomerListService {
  itemsChanged = new Subject<Customer[]>();
  startedEditing = new Subject<number>();
  private customers: Customer[] = [];

  setIngredients(customers: Customer[]) {
    this.customers = customers;
    this.itemsChanged.next(this.customers.slice());
  }

  getCustomers() {
    return this.customers.slice();
  }

  getCustomer(index: number) {
    return this.customers[index];
  }

  addIngredient(customer: Customer) {
    this.customers.push(customer);
    this.itemsChanged.next(this.customers.slice());
  }

  addIngredients(customers: Customer[]) {
    this.customers.push(...customers);
    this.itemsChanged.next(this.customers.slice());
  }

  updateIngredient(index: number, newIngredient: Customer) {
    this.customers[index] = newIngredient;
    this.itemsChanged.next(this.customers.slice());
  }

  deleteIngredient(index: number) {
    this.customers.splice(index, 1);
    this.itemsChanged.next(this.customers.slice());
  }
}
