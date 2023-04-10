import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../dto/product.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products: Product[];

  constructor(private scService: ShoppingCartService){}

  ngOnInit(): void {
    this.products = this.scService.getShoppingCartProducts();
    this.scService.shoppingCartChanged.subscribe(
      (products: Product[]) => {this.products = products}
    );
  }
}
