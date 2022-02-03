import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox ";
import {detailsProduct} from '../actions/productActions'

export default function ProductScreen(props) {
  // // Used to get the id in the URL
  // const { id } = useParams();

  // //Find the product with the id in the URL
  // const product = data.products.find((p) => p._id === id);
  const { id } = useParams();
  const productId = id
  
  //The function userSelector is a HOOK inside react redux, allow to
  //extract data from Redux store
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(detailsProduct(productId))
  },[dispatch, productId])

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Link to={"/"}>Back to result</Link>
      <div className="row top">
        <div className="col-2">
          <img
            className="large"
            src={__dirname + product.image}
            alt={product.name}
          />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li>Price: ${product.price}</li>

            <li>Description:</li>

            <li>{product.description}</li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div>${product.price}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="danger">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button className="primary block">Add to Cart</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
