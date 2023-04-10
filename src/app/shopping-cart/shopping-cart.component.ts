import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../dto/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  @Input() products: Product[];
  // @Output() productWasAdded = new EventEmitter<Product>();

  // addProductToCart(product: Product) {
  //   this.productWasAdded.emit(product);    
  //   console.log(product);
  // }
}
