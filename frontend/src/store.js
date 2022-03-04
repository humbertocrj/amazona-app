import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'
import {productListReducer, productDetailsReducer} from "./reducers/productReducers"
import {cartReducer} from "./reducers/cartReducers"
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducer";

//Initial state gets data from localstorage so the browser can be refreshed and updated
// the data will remain with the components

const initialState = {
  userSignin:{
    userInfo: localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):
    null
  },
  cart:{
    cartItems: localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[]
  }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin: userSigninReducer,
    userRegister:userRegisterReducer,
})

//Setup to use redux devtool, it seems hehehe. Now it's possible to monitor the state using inspect in the browser.
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
