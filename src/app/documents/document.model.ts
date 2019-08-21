import { Customer } from '../shared/customer.model';
import { Thing } from '../shared/thing.model';
import { Service } from '../shared/city.model';

export class Document {
  public number: string;
  public date: string;
  public attn: string;
  public customer: string;
  public worksite: string;

  public generalWelding: boolean;
  public generalRepair: boolean;
  public basementDoor: boolean;

  public fireEscapes: boolean;
  public awnings: boolean;
  public railings: boolean;

  public fences: boolean;
  public stairs: boolean;
  public gates: boolean;

  public securityDoor: boolean;
  public windowGuards: boolean;
  public otherServices: boolean;

  public description: string;
  public note: string;
  public price: number;
  public tax: boolean;

  public ingredients: Customer[];

  public things: Thing[];
  public aden: string;

  public services: Service[];
  // public name: boolean;

  constructor(
    number: string, 
    date: string, 
    attn: string, 
    customer: string,
    worksite: string,

    generalWelding: boolean,
    generalRepair: boolean,
    basementDoor: boolean,

    fireEscapes: boolean,
    awnings: boolean,
    railings: boolean,

    fences: boolean,
    stairs: boolean,
    gates: boolean,

    securityDoor: boolean,
    windowGuards: boolean,
    otherServices: boolean,

    description: string,
    note: string,
    price: number,
    tax: boolean,

    ingredients: Customer[],
    things: [],
    aden: string,

    
    cities: [],
    services: [],
    // giran: boolean

    )  {
    this.number = number;
    this.date = date;
    this.attn = attn;
    this.customer = customer;
    this.worksite = worksite;

    this.generalWelding = generalWelding;
    this.generalRepair = generalRepair;
    this.basementDoor = basementDoor;

    this.fireEscapes = fireEscapes;
    this.awnings = awnings;
    this.railings = railings;

    this.fences = fences;
    this.stairs = stairs;
    this.gates = gates;

    this.securityDoor = securityDoor;
    this.windowGuards = windowGuards;
    this.otherServices = otherServices;

    this.description = description;
    this.note = note;
    this.price = price;
    this.tax = tax;

    this.ingredients = ingredients;
    this.things = things;
    this.aden = aden;

    this.services = services;
    // this.giran = giran;
  }
}