import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";

export const PaymentMethodsScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
   
    if (shippingAddress==="") {
      navigate("/shipping");
    }
  });

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>

        <div className="radio">
          <input
            type="radio"
            id="paypal"
            value="Paypal"
            name="paymentMethod"
            required
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="paypal">Paypal</label>
        </div>
        <div className="radio">
          <input
            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="stripe">Stripe</label>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
