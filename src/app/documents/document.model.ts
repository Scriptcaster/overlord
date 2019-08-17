import { Ingredient } from '../shared/ingredient.model';

export class Document {
  public number: string;
  public date: string;
  public attn: string;
  public customer: string; //dev
  public description: string;
  public ingredients: Ingredient[];

  constructor(
    number: string, 
    date: string, 
    attn: string, 
    customer: string, 
    description: string, 
    ingredients: Ingredient[]) 
    {
    this.number = number;
    this.date = date;
    this.attn = attn;
    this.customer = customer;
    this.description = description;
    this.ingredients = ingredients;
  }
}