import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../dto/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  // public product = new Product(
  //   'Vitamin A-10 000 IU',
  //   '100 softgels',
  //   'What is vitamin A?<br><br>Vitamin A is actually a group of fat-soluble retinoids and carotenoids, chemical compounds that are a part of, or chemically related to, vitamin A. There are two types of vitamin A found in our diet - preformed vitamin retinoids (also known as retinol and its esterified form, retinyl ester) and provitamin A carotenoids (beta-carotene, alpha-carotene, and others).<br><br>Why is vitamin A important for my health?<br><br>* Vitamin A is important for numerous body functions including normal visual function, immune system health, healthy bones and teeth, and healthy skin.<br>* Our bodies need vitamin A to utilize protein.<br>* Vitamin A is also an antioxidant that protects against free radical damage.<br><br>Are beta-carotene and vitamin A the same thing?<br><br>Beta-carotene is classified as a carotenoid, which is in the vitamin A family. Carotenoids are organic pigments that are found in plants and fruits. Once ingested, beta-carotene can be converted to vitamin A in the liver. Beta-carotene is only converted to vitamin A as needed by the body, making it a safe source.',
  //   'https://vitamin4e.com/wp-content/uploads/2044-2.jpg',
  //   19.99
  // );
  @Input() product: Product;
  @Output() productAdded = new EventEmitter<Product>();

  addProductToCart(product: Product) {
    this.productAdded.emit(product);
  }
}
