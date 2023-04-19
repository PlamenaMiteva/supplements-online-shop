import { Component, OnInit } from '@angular/core';

import { map, mergeMap, take } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../auth/user.service';
import { UserProfile } from '../dto/user-profile';
import { Product } from '../dto/product.model';

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
      )
      .subscribe((user) => {
        this._userKey = user?.key || '';
        this._userId = user?.id || '';
        this.favoritesList = this.userService.getFavorites();
      });
  }

  onRemoveFromFavorites(index: number) {
    this.favoritesList.splice(index, 1);
    this.userService.deleteFavoriteItem(
      this._userKey,
      new UserProfile(this._userId, this.favoritesList || []),
      index
    );
  }
}
