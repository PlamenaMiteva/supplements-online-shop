import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../dto/product.model';
import { ProductService } from '../product.service';
import { Subscription, map, switchMap} from 'rxjs';
import { Category } from 'src/app/dto/category.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  category: Category;
  products?: Product[];
  subscription: Subscription;

  private _category: string;

  constructor(private productService: ProductService, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        switchMap((params) =>        
          this.productService.fetchProducts().pipe(
            map((products: Product[]) => {
              const param = params['category'] || '';
              this._category = param.charAt(0).toUpperCase() + param.slice(1);
              if (this._category) {
                products = products.filter(
                  (item) => Category[item.category] === this._category
                );              
              }
              return products;
            })
          )
        )
      )
      .subscribe((products) => {
        this.products = products;
      });
    }
   
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
