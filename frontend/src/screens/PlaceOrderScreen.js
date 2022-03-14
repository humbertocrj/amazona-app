import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";

export default function PlaceOrderScreen() {
  //Access of redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
    if (cart.shippingAddress === "") {
      navigate("/shipping");
    }
    if(cart.cartItems.length ===0){
        navigate('/')
    }
  }, [cart.paymentMethod, navigate, cart.shippingAddress, cart.cartItems.length]);

  const toPrice = (num) => {
    return Number(num.toFixed(2));
  }; // Convert 5.1234 to "5.12", and then, 5.12 number

  cart.itemsPrice =  toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
const placeOrderHandler =()=>{

}
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>
                  {cart.shippingAddress.fullName} <br></br>
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod} <br></br>
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <img
                          key={Date.now()}
                          className="small"
                          src={`/${item.image}`}
                          alt={item.name}
                        ></img>

                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price.toFixed(2)}= ${(item.price * item.qty).toFixed(2)}{" "}
                        </div>
                        <div></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Sumary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div><strong>Order Total</strong></div>
                  <div><strong>${cart.totalPrice}</strong></div>
                </div>
              </li>
              <li>
                  <button 
                  type="button" 
                  className="primary block" 
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                  >Place Order</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
