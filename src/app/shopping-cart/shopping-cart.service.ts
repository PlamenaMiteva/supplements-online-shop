import { EventEmitter } from "@angular/core";
import { Product } from "../dto/product.model";

export class ShoppingCartService {
  shoppingCartChanged = new EventEmitter<Product[]>();
  private products: Product[] = [];

  getShoppingCartProducts() {
    return this.products.slice();
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.shoppingCartChanged.emit(this.products.slice());
  }
}