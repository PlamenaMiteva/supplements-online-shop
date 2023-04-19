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
            map((data: any) => {
              resData.key = data.name;
              return resData;
            })
          );
        }),
        tap((data) => {
          this.handleAuthentication(
            data.email,
            data.localId,
            data.idToken,
            +data.expiresIn,
            data.key
          );
        })
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
        mergeMap((resData) =>
          this.userService.getUserProfile().pipe(
            map((userData) => {
              const user = userData.find((x) => x.userId === resData.localId);
              resData.key = user?.key || '';
              resData.favorites = user?.favorites || [];
              return resData;
            }),
            tap((data) => {
              this.handleAuthentication(
                data.email,
                data.localId,
                data.idToken,
                +data.expiresIn,
                data.key,
                data.favorites
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
        userData.key
      );

      if (loggedUser.token) {
        this.user.next(loggedUser);
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

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    key?: string,
    favorites: Product[] = []
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate, key);

    this.userService.setFavorites(favorites);
    this.user.next(user);
    
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
