import React from "react";
import data from "../data";
import { useParams, Link } from "react-router-dom";
import Rating from "../components/Rating";

export default function ProductScreen() {
  // Used to get the id in the URL
  const { id } = useParams();

  //Find the product with the id in the URL
  const product = data.products.find((p) => p._id === id);

  if (!product) {
    return "Product not found!";
  }
  return (
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
                      <span className="error">Unavailable</span>
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
