import { Component, Input } from '@angular/core';

import { map, take } from 'rxjs';

import { Product } from '../../../dto/product.model';
import { UserService } from 'src/app/auth/user.service';
import { User } from 'src/app/dto/user.model';
import { UserProfile } from 'src/app/dto/user-profile';

import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../../auth/store/auth.actions';

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
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('auth')
    .pipe(
      take(1),
      map(authState => {
        return {
          user: authState.user, 
          favorites: [...authState.favorites]};
      })      
    )
    .subscribe((data) => {
      this.user = data.user;
      this.favorites = data.favorites;
    });
    // this.authService.user
    //   .pipe(
    //     take(1),
    //     mergeMap((resData) =>
    //       this.userService.getUserProfile(resData?.id || '').pipe(
    //         map((userData) => {
    //           this.favorites = userData?.favorites || [];
    //           if (resData) {
    //             resData.key = userData?.key || '';
    //           }
    //           return resData;
    //         })
    //       )
    //     )
    //   )
    //   .subscribe((user) => {
    //     this.user = user;
    //   });
  }

  addFavorite() {
    if (this.user) {
      this.favorites.push(this.product);
      this.store.dispatch(new AuthActions.AddFavorite(this.product));
      this.userService.updateFavorites(
        this.user.key,
        new UserProfile(this.user.id, [...(this.favorites || [])])
      );
    }
  }
}
