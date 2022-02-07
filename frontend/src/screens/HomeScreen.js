import React, { useEffect} from "react";
import Product from "../components/Product";
import MessageBox from "../components/MessageBox ";
import LoadingBox from "../components/LoadingBox";
import {useSelector, useDispatch} from 'react-redux'
import {listProducts} from '../actions/productActions'

export default function HomeScreen() {

//  The react hook is no more necessary, because the application's states is now managed by the Redux(
// store.js, productConstants.js, productActions.js, prodductReducers.js). 

// This hook returns a reference to the dispatch function from the Redux store. 
// You may use it to dispatch actions as needed.
const dispatch = useDispatch();

// Allows you to extract data from the Redux store state, using a selector function.
const productList = useSelector((state)=>state.productList)


const {loading, error, products} = productList
 
// What is useEffect in React?
// What does useEffect do? By using this Hook, you tell React that your component needs to do something after render. 
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);
  //THE CODE ABOVE IS USED TO GET DATA FROM BACKEND

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="row center">
      {products.map((product) => {
        return <Product key={product._id} product={product} />;
      })}
    </div>
  );
}
