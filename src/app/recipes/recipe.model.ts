import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public attn: string; //dev
  public customer: string; //dev
  public ingredients: Ingredient[];

  constructor(name: string, desc: string, imagePath: string, attn: string, customer: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.attn = attn;
    this.customer = customer;
    this.ingredients = ingredients;
  }
}
