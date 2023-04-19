import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs';

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
  public favoritesList: Product[];
  private _userKey: string;
  private _userId: string;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.favoritesList = user?.favorites ? [...user.favorites] : [];
    this._userKey = user?.key || '';
    this._userId = user?.id || '';
    // this.authService.user.pipe(take(1)).subscribe((user) => {
    //   this.favoritesList = user?.favorites ? [...user.favorites] : [];
    //   this._userKey = user?.key || '';
    //   this._userId = user?.id || '';
    // });    
  }

  onRemoveFromFavorites(index: number) {
    this.favoritesList.splice(index);
    this.userService.updateFavorites(
      this._userKey,
      new UserProfile(this._userId, [...(this.favoritesList || [])])
    );
  }
}
