import { Action } from '@ngrx/store';
import { Product } from 'src/app/dto/product.model';

export const ADD_PRODUCT = '[Shopping Cart] Add Product';
export const REMOVE_PRODUCT = '[Shopping Cart] Remove Product';
export const UPDATE_QUANTITY = '[Shopping Cart] Update Quantity';

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload: { product: Product; quantity: number }) {}
}

export class RemoveProduct implements Action {
  readonly type = REMOVE_PRODUCT;
  constructor(public payload: number) {}
}

export class UpdateQuantity implements Action {
    readonly type = UPDATE_QUANTITY;
    constructor(public payload: { index: number, isAdd: boolean }) {}
  }

export type ShoppingCartActions = AddProduct | RemoveProduct | UpdateQuantity;