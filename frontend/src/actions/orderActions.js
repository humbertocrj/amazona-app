import {
    CART_EMPTY,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";

import Axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    //getState() RETURNS THE WHOLE REDUX STORE TO BE USED
    const {
      userSignin: { userInfo },
    } = getState();

    //Send order to backend with the user token. If it's correct, the order will be placed in the order
    const { data } = await Axios.post("api/orders", order, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({type:CART_EMPTY})
    localStorage.removeItem('cartItems')
    
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
