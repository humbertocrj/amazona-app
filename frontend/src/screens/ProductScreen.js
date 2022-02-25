import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Must use useParams and useNavigate because we are using reac-router-dom V.6
import { Link, useParams, useNavigate, Route } from "react-router-dom";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox ";
import { detailsProduct } from "../actions/productActions";
import CartScreen from "./CartScreen";


export default function ProductScreen(props) {
  // // Used to get the id in the URL
  // const { id } = useParams();

  // //Find the product with the id in the URL
  // const product = data.products.find((p) => p._id === id);
  const { id } = useParams();
  const productId = id;

  //The function userSelector is a HOOK inside react redux, allow to
  //extract data from Redux store
  const productDetails = useSelector((state) => state.productDetails);

  //Using simple react hook to store quantity state of the product in this component
  const [qty, setQty] = useState(1)

  const { loading, error, product } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const navigate = useNavigate()

  const addToCartHandler = () => {
    

     navigate(`/cart/${productId}?qty=${qty}`)
  }
  

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

        {/* Product details */}
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

        {/* Cart box */}
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
              {/* if there are products available, the buttom will be shown */}
              {product.countInStock > 0 && (
                <>
                  <li>
                    <div className="row">
                      <div>Qty</div>
                      <div>
                        <select
                        
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x} value={x + 1}>{x + 1}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        {/* End of cart box */}
      </div>
    </div>
  );
}
