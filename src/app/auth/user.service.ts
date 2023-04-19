import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { UserProfile } from '../dto/user-profile';
import { Product } from '../dto/product.model';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { AuthResponseData } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private dbPath = '/users';
  usersRef: AngularFireList<UserProfile>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.usersRef = this.db.list(this.dbPath);
  }

  createUser(id: string) {
    return this.http
      .post(
        'https://test-app-4e5fa-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        {userId: id, favorites: []}
      );
    // return this.usersRef.push(new UserProfile(id, favorites));
  }

  getUserProfile(){
        return this.usersRef
          .snapshotChanges()
          .pipe(
            map((changes) =>
              changes
                .map((c) => ({ key: c.payload.key, ...c.payload.val() }))
                // .filter((x) => x.userId === userId)
            )
          );
        //   .subscribe((data) => {
        //     //this.tutorials = data;
        //   });
  }

  updateFavorites(key: string, value: any){
    return this.usersRef.update(key, value);
  }
}
