import {CART_ADD_ITEM} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
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
     
    default:
      return state;
  }
};
