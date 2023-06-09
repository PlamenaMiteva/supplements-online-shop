import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../../dto/product.model';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { ProductService } from '../product.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingCartActions from '../../shopping-cart/store/shopping-cart.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  id: number;
  quantity = '1';
  @ViewChild('quantityInput') quantityInput: ElementRef;

  constructor(
    private productService: ProductService,
    private scService: ShoppingCartService,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.product = this.productService.getProduct(this.id);
    });
  }

  addProductToCart() {
    const productQuantity = +this.quantityInput.nativeElement.value;
    //this.scService.addProduct(this.product, productQuantity);
    this.store.dispatch(
      new ShoppingCartActions.AddProduct({
        product: this.product,
        quantity: productQuantity,
      })
    );
  }

  increment() {
    let number = +this.quantity;
    number++;
    this.quantity = number.toString();
  }

  decrement() {
    let number = +this.quantity;
    if (number < 2) return;
    number--;
    this.quantity = number.toString();
  }
}
