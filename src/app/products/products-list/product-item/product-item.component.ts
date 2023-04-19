import { Component, Input } from '@angular/core';
import { Product } from '../../../dto/product.model';
import { UserService } from 'src/app/auth/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs';
import { User } from 'src/app/dto/user.model';
import { UserProfile } from 'src/app/dto/user-profile';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: Product;
  @Input() index: number;
  private user: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    // this.authService.user.pipe(take(1)).subscribe((user) => {
    //   this.user = user;
    // });
  }

  addFavorite() {
    if (this.user) {
      this.user.favorites?.push(this.product);
      this.userService.updateFavorites(
        this.user.key,
        new UserProfile(this.user.id, [...(this.user.favorites || [])])
      );
    }
  }
}
