import { Component, EventEmitter, Output } from '@angular/core';

import { Product } from '../../dto/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  public products: Product[] = [
    new Product(
      'Vitamin A-10 000 IU',
      '100 softgels',
      'test desc',
      'https://vitamin4e.com/wp-content/uploads/2044-2.jpg',
      19.99
    ),
    new Product(
      'Vitamin B-100 Complex',
      '100 veg capsules',
      'test desc',
      'https://vitamin4e.com/wp-content/uploads/b-100-complex-100-kapsuli-595-800x800-1.jpg',
      54.99
    ),
    new Product(
      'Vitamin C-1000',
      '100 tablets',
      'test desc',
      'https://vitamin4e.com/wp-content/uploads/6-8.jpg',
      32.99
    ),
    new Product(
      'Vitamin D-1000 IU',
      '180 softgels',
      'test desc',
      'https://vitamin4e.com/wp-content/uploads/2068-2.jpg',
      24.99
    ),
    new Product(
      'Liquid Vitamin D-3',
      '60 ml',
      'test desc',
      'https://vitamin4e.com/wp-content/uploads/1201-3.jpg',
      27.99
    ),
    new Product(
      'Iron- 18 mg',
      '120 veg capsules',
      'test desc',
      'https://vitamin4e.com/wp-content/uploads/2024-3.jpg',
      30.99
    ),
    new Product(
      'Kelp Natural Iodine - 150 mcg',
      '200 tablets',
      'test desc',
      'https://vitamin4e.com/wp-content/uploads/2026-3.jpg',
      25.99
    ),
    new Product(
      'Magnesium Citrate',
      '120 veg capsules',
      'test desc',
      'https://vitamin4e.com/wp-content/uploads/1-60.jpg',
      46.99
    ),
  ];
  @Output() productWasSelected = new EventEmitter<Product>();

  onProductSelected(product: Product){
    this.productWasSelected.emit(product);
  }
}
