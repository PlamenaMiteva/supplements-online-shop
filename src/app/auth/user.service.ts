import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

import { UserProfile } from '../dto/user-profile';

@Injectable({ providedIn: 'root' })
export class UserService {
  usersRef: AngularFireList<UserProfile>;
  private dbPath = '/users';

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.usersRef = this.db.list(this.dbPath);
  }

  createUser(id: string) {
    return this.http.post(
      'https://test-app-4e5fa-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      { userId: id, favorites: [] }
    );
  }

  getUserProfile(id: string) {
    return this.usersRef.snapshotChanges().pipe(
      map(
        (changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() })).
          find((x) => x.userId === id)
      )
    );
  }

  updateFavorites(key: string, value: any) {
    return this.usersRef.update(key, value);
  }
}
