import { Component, OnDestroy, OnInit } from '@angular/core';

import { ShoppingCartService } from './shopping-cart.service';
import { OrderItem } from '../dto/order-item';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingCartActions from './store/shopping-cart.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  products: Observable<{ products: OrderItem[] }>;
  amount: number;
  numberOfProducts: number;
  private scChangedSub: Subscription;

  constructor(
    private scService: ShoppingCartService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.products = this.store.select('shoppingCart');
    // this.products = this.scService.getShoppingCartProducts();
    // this.amount = this.scService.getTotalAmount();
    // this.numberOfProducts = this.scService.getNumberOfProducts();
    // this.scChangedSub = this.scService.shoppingCartChanged.subscribe(
    //   (products: OrderItem[]) => {this.products = products}
    // );
  }

  onUpdateQuantity(index: number, isAdd = true){
    this.store.dispatch(
      new ShoppingCartActions.UpdateQuantity({index: index, isAdd: isAdd})
    );
    //this.scService.updateQuantity(index, isAdd);
  }

  onRemoveProduct(index: number){
    this.store.dispatch(
      new ShoppingCartActions.RemoveProduct(index)
    );
    //this.scService.removeProduct(index);
  }

  ngOnDestroy(): void {
    // this.scChangedSub.unsubscribe();
  }
}
