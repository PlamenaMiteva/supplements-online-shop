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
          this.userService.getUserProfile(resData?.id ||'').pipe(
            map((userData) => {
              this._userKey = userData?.key || '';
              this.favoritesList = userData?.favorites || [];
              return resData;
            })
          )
        )
      )
      .subscribe((user) => {
        this._userId = user?.id || '';
      });
  }

  onRemoveFromFavorites(index: number) {
    this.favoritesList.splice(index, 1);
    this.userService.updateFavorites(
      this._userKey,
      new UserProfile(this._userId, this.favoritesList || [])
    );
  }
}
