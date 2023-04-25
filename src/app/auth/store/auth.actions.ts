import { Action } from '@ngrx/store';
import { Product } from 'src/app/dto/product.model';

export const LOGIN_START = '[Auth] Login Start';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate';
export const AUTHENTICATE_FIAL = '[Auth] Authenticate Fail';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const LOGOUT = '[Auth] Logout';
export const ADD_FAVORITE = '[Auth] AddFavorite';
export const REMOVE_FAVORITE = '[Auth] RemoveFavorite';

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {email: string, password: string}){}
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: {email: string, password: string}){}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      key?: string,
      favorites: Product[]
    }
  ) {}
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FIAL;

    constructor(public payload: string){}
}

export class ClearError implements Action{
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action{
    readonly type = AUTO_LOGIN;
}

export class Logout implements Action{
    readonly type = LOGOUT;
}

export class AddFavorite implements Action {
    readonly type = ADD_FAVORITE;

    constructor(public payload: Product){}
}

export class RemoveFavorite implements Action {
    readonly type = REMOVE_FAVORITE;

    constructor(public payload: number){}
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | AutoLogin
  | ClearError
  | AddFavorite
  | RemoveFavorite;
