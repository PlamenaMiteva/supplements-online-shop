import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../../dto/product.model';
import { ProductService } from '../product.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products?: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe();

    this.subscription = this.productService.productChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );
    }
   
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
