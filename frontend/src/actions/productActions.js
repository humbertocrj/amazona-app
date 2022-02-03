import Axios from "axios";
const {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL} = require('../constants/productConstants')

//Returns a "= ()=>(dispatch)=>async {...}"
export const listProducts = ()=> async (dispatch) => {
  
  // dispatch() is the method used to dispatch actions and trigger state changes to the store
  //Before the response
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  try {
    //GET DATA FROM BACKEND

    //Axios return and object that can be desctruc
    // const {data} = await Axios.get("/api/products");
    const response = await Axios.get("/api/products");
    const data = response.data

    //After response be found successfully
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload:err.message });
  }
};
