import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../dto/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: Product;
  @Output() productSelected = new EventEmitter<void>();

  onSelected(){
    this.productSelected.emit();
  }
}
