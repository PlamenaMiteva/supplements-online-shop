import { Component, Input } from '@angular/core';
import { Product } from '../../../dto/product.model';
import { UserService } from 'src/app/auth/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { map, mergeMap, take } from 'rxjs';
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
  private favorites: Product[];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.user
      .pipe(
        take(1),
        mergeMap((resData) =>
          this.userService.getUserProfile().pipe(
            map((userData) => {
              const user = userData.find((x) => x.userId === resData?.id);
              this.userService.favoritesList = user?.favorites || [];
              return resData;
            })
          )
        )
      ).subscribe((user) => {
      this.user = user;
      this.favorites = this.userService.getFavorites();
    });
  }

  addFavorite() {
    if (this.user) {
      this.favorites.push(this.product);
      this.userService.addFavoriteItem(
        this.user.key,
        new UserProfile(this.user.id, [...(this.favorites || [])])
      );
    }
  }
}
