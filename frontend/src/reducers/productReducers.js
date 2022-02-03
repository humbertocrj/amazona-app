// In Redux, a reducer is a pure function that takes an action and the previous
//  state of the application and returns the new state. The action describes what
//   happened and it is the reducer's job to return the new state based on that action.

const {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL} = require('../constants/productConstants')

//Based on the action and previous state, the reducer returns a new state
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
