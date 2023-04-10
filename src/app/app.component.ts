import { Component, OnInit } from '@angular/core';
import { Product } from './dto/product.model';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'supplemets-online-shop';
  selectedProduct : Product;

  constructor(private productService: ProductService){}

  ngOnInit(){
    this.productService.productSelected.subscribe(
      (product: Product) => {this.selectedProduct = product}
    );    
  }
}
