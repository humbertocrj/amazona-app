import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'
import {productListReducer, productDetailsReducer} from "./reducers/productReducers"

const initialState = {};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer
})

//Setup to use redux devtool, it seems hehehe. Now it's possible to monitor the state using inspect in the browser.
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
