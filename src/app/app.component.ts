import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from './dto/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'supplemets-online-shop';
  selectedProduct : Product;
  cartProductList: Product[] = [];
  @Output() productWasAdded = new EventEmitter<Product>();

  addSelectedProductToCart(product: Product) {
    this.productWasAdded.emit(product);
  }

  addProductToCart(product: Product) {
    console.log(product);
    this.cartProductList.push(product);
  }
}
