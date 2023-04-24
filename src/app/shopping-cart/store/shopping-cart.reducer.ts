import { OrderItem } from 'src/app/dto/order-item';
import * as ShoppingCartActions from './shopping-cart.actions';

export interface State {
  products: OrderItem[];
  numberOfProducts: number;
  totalAmount: number;
}

const initialState: State = {
  products: [],
  numberOfProducts: 0,
  totalAmount: 0,
};

export function shoppingCartReducer(
  state: State = initialState,
  action: ShoppingCartActions.ShoppingCartActions
) {
  switch (action.type) {
    case ShoppingCartActions.ADD_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products,
          new OrderItem(action.payload.product, action.payload.quantity),
        ],
        numberOfProducts: state.numberOfProducts + action.payload.quantity,
        totalAmount:
          state.totalAmount +
          action.payload.product.price * action.payload.quantity,
      };
    case ShoppingCartActions.REMOVE_PRODUCT:
      const itemToRemove = state.products.find(
        (item, itemIndex) => itemIndex === action.payload
      );
      const productsNumber = itemToRemove
        ? state.numberOfProducts - itemToRemove.quantity
        : state.numberOfProducts;
      const amount = itemToRemove
        ? state.totalAmount - itemToRemove.quantity * itemToRemove.product.price
        : state.totalAmount;
      return {
        ...state,
        products: state.products.filter((item, itemIndex) => {
          return itemIndex !== action.payload;
        }),
        numberOfProducts: productsNumber,
        totalAmount: amount,
      };
    case ShoppingCartActions.UPDATE_QUANTITY:
      const operator = action.payload.isAdd ? 1 : -1;
      const oldItem = state.products[action.payload.index];
      const newQuantity = oldItem.quantity + operator;
      if (newQuantity < 1) {
        return {
          ...state,
        };
      }
      const newProduct = new OrderItem({ ...oldItem.product }, newQuantity);

      const updatedProducts = [...state.products];
      updatedProducts[action.payload.index] = newProduct;
      console.log(updatedProducts);

      return {
        ...state,
        products: updatedProducts,
        numberOfProducts: state.numberOfProducts + operator,
        totalAmount: state.totalAmount + operator * newProduct.product.price,
      };
    default:
      return state;
  }
}
