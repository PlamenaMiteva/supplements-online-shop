import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ProductService } from './product.service';
import { Product } from '../dto/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsResolverService {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> {
    const products = this.productService.getProducts();

    if (products.length === 0) {
      return this.productService.fetchProducts();
    } else {
      return products;
    }
  }
}
