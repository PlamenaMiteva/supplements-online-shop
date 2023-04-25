import { Component, OnInit } from '@angular/core';

import { map, take } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../auth/user.service';
import { UserProfile } from '../dto/user-profile';
import { Product } from '../dto/product.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  public favoritesList: Product[] = [];
  private _userKey: string;
  private _userId: string;

  constructor(
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(
        take(1),
        map((authState) => {
          return {
            user: authState.user,
            favorites: [...authState.favorites],
          };
        })
      )
      .subscribe((data) => {
        this._userKey = data.user?.key || '';
        this._userId = data.user?.id || '';
        this.favoritesList = [...data.favorites];
      });

    // this.authService.user
    //   .pipe(
    //     take(1),
    //     mergeMap((resData) =>
    //       this.userService.getUserProfile(resData?.id ||'').pipe(
    //         map((userData) => {
    //           this._userKey = userData?.key || '';
    //           this.favoritesList = userData?.favorites || [];
    //           return resData;
    //         })
    //       )
    //     )
    //   )
    //   .subscribe((user) => {
    //     this._userId = user?.id || '';
    //   });
  }

  onRemoveFromFavorites(index: number) {
    if (this._userId && this._userKey && this.favoritesList.length > 0) {
      this.favoritesList.splice(index, 1);
      this.store.dispatch(new AuthActions.RemoveFavorite(index));
      this.userService.updateFavorites(
        this._userKey,
        new UserProfile(this._userId, this.favoritesList || [])
      );
    }
  }
}
