import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { UserProfile } from '../dto/user-profile';
import { Product } from '../dto/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';
import { AuthResponseData } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  favoritesChanged = new BehaviorSubject<Product[]>([]);
  public favoritesList: Product[] = [];
  usersRef: AngularFireList<UserProfile>;
  private dbPath = '/users';

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.usersRef = this.db.list(this.dbPath);
  }

  getFavorites() {
    return this.favoritesList.slice();
  }

  setFavorites(data: Product[]) {
    this.favoritesList = data;
    this.favoritesChanged.next(this.favoritesList.slice());
  }

  createUser(id: string) {
    return this.http.post(
      'https://test-app-4e5fa-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      { userId: id, favorites: [] }
    );
  }

  getUserProfile() {
    return this.usersRef.snapshotChanges().pipe(
      map(
        (changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        // .filter((x) => x.userId === userId)
      )
    );
  }

  updateFavorites(key: string, value: any) {
    return this.usersRef.update(key, value);
  }

  addFavoriteItem(key: string, value: any) {    
    this.favoritesList.push(value);
    this.favoritesChanged.next(this.favoritesList.slice());
    this.updateFavorites(key, value);
  }

  deleteFavoriteItem(key: string, value: any, index: number) {
    this.favoritesList.splice(index, 1);
    this.favoritesChanged.next(this.favoritesList.slice());
    this.updateFavorites(key, value);
  }
}
