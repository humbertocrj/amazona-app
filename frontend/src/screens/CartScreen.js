// Must use useParams and useSearchParams because we are using reac-router-dom V.6
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";

export default function CartScreen(props) {
  // Must use useParams and useSearchParams because we are using reac-router-dom V.6
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const qty = searchParams.get("qty") ? searchParams.get("qty") : 1;
  const dispatch = useDispatch();

  // What is useEffect in React?
  // What does useEffect do? By using this Hook, you tell React that your component needs to do something after render.
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART: ProductID:{id} Quantity:{qty}
      </p>
    </div>
  );
}
