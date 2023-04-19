import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  mergeMap,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../dto/user.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Product } from '../dto/product.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  key?: string;
  favorites?: Product[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  currentUser: User | null = null;
  private _tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAYA8-8jEi1E43K-zRBIpaHqkDYp2pGyQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        mergeMap((resData) => {
          return this.userService.createUser(resData.localId).pipe(
            map((data) => {
              return resData;
            })
          );
        }),
        mergeMap((resData) =>
          this.userService.getUserProfile().pipe(
            map((userData) => {
              const user = userData.find((x) => x.userId === resData.localId);
              resData.key = user?.key || '';
              resData.favorites = user?.favorites ? [...user.favorites] : [];
              return resData;
            }),
            tap((data) => {
              this.handleAuthentication(
                data.email,
                data.localId,
                data.idToken,
                +data.expiresIn,
                data.favorites,
                data.key
              );
            })
          )
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAYA8-8jEi1E43K-zRBIpaHqkDYp2pGyQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        // tap((resData) => {
        //   this.handleAuthentication(
        //     resData.email,
        //     resData.localId,
        //     resData.idToken,
        //     +resData.expiresIn
        //   );
        // }),
        mergeMap((resData) =>
          this.userService.getUserProfile().pipe(
            map((userData) => {
              const user = userData.find((x) => x.userId === resData.localId);
              resData.key = user?.key || '';
              resData.favorites = user?.favorites ? [...user.favorites] : [];
              return resData;
            }),
            tap((data) => {
              this.handleAuthentication(
                data.email,
                data.localId,
                data.idToken,
                +data.expiresIn,
                data.favorites,
                data.key
              );
            })
          )
        )
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }
    this._tokenExpirationTimer = null;
    this.currentUser = null;
  }

  autoLogin() {
    const data = localStorage.getItem('userData');
    if (!data) {
      return;
    } else {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpiritionDate: Date;
        favorites: Product[];
        key: string;
      } = JSON.parse(data);

      const loggedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpiritionDate),
        userData.favorites || [],
        userData.key
      );

      if (loggedUser.token) {
        this.user.next(loggedUser);
        this.currentUser = loggedUser;
        const expirationDuration = new Date(userData._tokenExpiritionDate).getTime()-new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  autoLogout(expirationDuration: number) {
    this._tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  getCurrentUser(){
    return this.currentUser;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    favorites?: Product[],
    key?: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate, favorites, key);

    this.user.next(user);
    this.currentUser = user;
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error ocured!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is not correct!';
        break;
    }
    return throwError(() => errorMessage);
  }
}
