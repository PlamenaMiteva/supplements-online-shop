import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Product } from 'src/app/dto/product.model';
import * as AuthActions from './auth.actions';
import { UserService } from '../user.service';
import { User } from 'src/app/dto/user.model';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((authData: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAYA8-8jEi1E43K-zRBIpaHqkDYp2pGyQ',
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            mergeMap((resData) => {
              return this.userService.createUser(resData.localId).pipe(
                map((data: any) => {
                  resData.key = data.name;
                  return resData;
                })
              );
            }),
            tap(resData =>{
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(resData);
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAYA8-8jEi1E43K-zRBIpaHqkDYp2pGyQ',
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            mergeMap((resData) =>
              this.userService.getUserProfile(resData.localId).pipe(
                map((userData) => {
                  resData.key = userData?.key || '';
                  resData.favorites = userData?.favorites || [];
                  return resData;
                })
              )
            ),
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(resData);
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const data = localStorage.getItem('userData');
        if (!data) {
            return {type: 'DUMMY'};
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
            userData.key,
            [...userData.favorites]
          );

          if (loggedUser.token) {
            const expirationDuration =
              new Date(userData._tokenExpiritionDate).getTime() -
              new Date().getTime();
            this.authService.setLogoutTimer(expirationDuration);
            return new AuthActions.AuthenticateSuccess({
              email: loggedUser.email,
              userId: loggedUser.id,
              token: userData._token,
              expirationDate: new Date(userData._tokenExpiritionDate),
              key: loggedUser.key,
              favorites: [...loggedUser.favorites]
            });
          }
          return {type: 'DUMMY'};
        }
      })
    )
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
        })
      ),
    { dispatch: false }
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
        tap(() => {
          this.router.navigate(['/products']);
        })
      ),
    { dispatch: false }
  );
}

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

const handleAuthentication = (resData: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate,
    resData.key,
    resData.favorites
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate: expirationDate,
    key: resData.key,
    favorites: resData.favorites || []
  });
};

const handleError = (errorResponse: any) => {
  let errorMessage = 'An unknown error ocured!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
  return of(new AuthActions.AuthenticateFail(errorMessage));
};
