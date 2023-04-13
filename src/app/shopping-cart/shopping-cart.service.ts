import { OrderItem } from "../dto/order-item";
import { Product } from "../dto/product.model";
import { Subject } from "rxjs";

export class ShoppingCartService {
  shoppingCartChanged = new Subject<OrderItem[]>();
  private products: OrderItem[] = [];

  getShoppingCartProducts() {
    return this.products.slice();
  }

  addProduct(product: Product, quantity: number) {
    this.products.push(new OrderItem(product, quantity));
    this.shoppingCartChanged.next(this.products.slice());
  }

  getNumberOfProducts(){
    return this.products.reduce(( sum , item ) => sum + item.quantity , 0);
  }

  getTotalAmount(){
    return this.products.reduce(( sum , item ) => sum + item.quantity * item.product.price , 0);
  }
}