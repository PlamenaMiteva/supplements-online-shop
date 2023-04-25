import { User } from 'src/app/dto/user.model';
import * as AuthActions from './auth.actions';
import { Product } from 'src/app/dto/product.model';

export interface State {
  user: User | null;
  authError: string;
  loading: boolean;
  favorites: Product []
}

const initialState: State = {
  user: null,  
  authError: '',
  loading: false,
  favorites: [],
};

export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate,
        action.payload.key
      );
      return {
        ...state,
        user: user,
        loading: false,
        favorites: [...action.payload.favorites],
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        favorites: [],
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: '',
        loading: true,
      };
    case AuthActions.AUTHENTICATE_FIAL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: '',
      };
    case AuthActions.ADD_FAVORITE:
      const favorites = [...state.favorites];
      favorites.push(action.payload);
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case AuthActions.REMOVE_FAVORITE:
        const itemToRemove = state.favorites.find(
            (item, itemIndex) => itemIndex === action.payload
          );          
      return {
        ...state,
        favorites: state.favorites.filter((item, itemIndex) => {
            return itemIndex !== action.payload;
          })
      };
    default:
      return state;
  }
}
