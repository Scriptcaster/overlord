import { Customer } from '../shared/customer.model';
import { Subject } from 'rxjs';

export class CustomerListService {
  itemsChanged = new Subject<Customer[]>();
  startedEditing = new Subject<number>();
  private ingredients: Customer[] = [];

  setIngredients(ingredients: Customer[]) {
    this.ingredients = ingredients;
    this.itemsChanged.next(this.ingredients.slice());
  }

  getCustomers() {
    return this.ingredients.slice();
  }

  getCustomer(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Customer) {
    this.ingredients.push(ingredient);
    this.itemsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Customer[]) {
    this.ingredients.push(...ingredients);
    this.itemsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Customer) {
    this.ingredients[index] = newIngredient;
    this.itemsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.itemsChanged.next(this.ingredients.slice());
  }
}
