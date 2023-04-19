import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from 'src/app/dto/product.model';
import { ProductService } from '../../product.service';
import { Category } from 'src/app/dto/category.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe();

    this.subscription = this.productService.productChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products.filter(item => item.category === Category.Sports);
        }
      );
    }
   
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}