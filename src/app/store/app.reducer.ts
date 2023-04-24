import * as fromShoppingCart from '../shopping-cart/store/shopping-cart.reducer';
import * as fromAuth from '../auth/store/auth-reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingCart: fromShoppingCart.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  shoppingCart: fromShoppingCart.shoppingCartReducer,
  auth: fromAuth.AuthReducer,
};
