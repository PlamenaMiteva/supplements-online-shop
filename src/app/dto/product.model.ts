import { Category } from "./category.model";

export class Product {
  public name: string;
  public category: Category;
  public quantity: string;
  public description: string;
  public imageUrl: string;
  public price: number;

  constructor(name: string, category: Category, quantity: string, description: string, imagePath: string, price: number) {
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.description = description;
    this.imageUrl = imagePath;
    this.price = price;
  }
}
