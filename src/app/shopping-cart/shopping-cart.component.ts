import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../dto/product.model';
import { ShoppingCartService } from './shopping-cart.service';
import { Subscription } from 'rxjs';
import { OrderItem } from '../dto/order-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  products: OrderItem[];
  amount: number;
  numberOfProducts: number;
  private scChangedSub: Subscription;

  constructor(private scService: ShoppingCartService){} 

  ngOnInit(): void {
    this.products = this.scService.getShoppingCartProducts();
    this.amount = this.scService.getTotalAmount();
    this.numberOfProducts = this.scService.getNumberOfProducts();
    this.scChangedSub = this.scService.shoppingCartChanged.subscribe(
      (products: OrderItem[]) => {this.products = products}
    );
  }

  ngOnDestroy(): void {
    this.scChangedSub.unsubscribe();
  }
}
