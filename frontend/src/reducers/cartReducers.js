import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from "../constants/cartConstants";
import { CART_EMPTY } from "../constants/orderConstants";

export const cartReducer = (state = { cartItems: [], shippingAddress: "" } , action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      //Item comes from dispatch in cartActions.js
      //We will try to add this item to the cart
      const item = action.payload;

      //Verifies if the added item already exists in the cart
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          //Maintains the original state add the new item if it is not in the cart
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      }else{
        //   If the item a new element we add it to the cart
          return {...state, cartItems: [...state.cartItems, item]}
      }
     case CART_REMOVE_ITEM:
      return {
        //Maintains the original state add the new item if it is not in the cart
        ...state,
        cartItems: state.cartItems.filter((x) =>
          x.product !== action.payload 
        ),
      };
      case CART_SAVE_SHIPPING_ADDRESS:
        return {...state, shippingAddress:action.payload}
      case CART_SAVE_PAYMENT_METHOD:
        return {...state, paymentMethod: action.payload}
      case CART_EMPTY:
        return {...state, cartItems:[]}
    default:
      return state;
  }
};
