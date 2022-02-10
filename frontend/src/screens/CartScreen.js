// Must use useParams and useSearchParams because we are using reac-router-dom V.6
import { useEffect } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox ";

export default function CartScreen(props) {
  // Must use useParams and useSearchParams because we are using reac-router-dom V.6
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const qty = searchParams.get("qty") ? searchParams.get("qty") : 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // What is useEffect in React?
  // What does useEffect do? By using this Hook, you tell React that your component needs to do something after render.
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    //delete action
  };

  const checkoutHandler = () =>{
    navigate("/signin?redirect=shipping")
  }

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>Cart is empty</MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li keys={item.product}>
                <div className="row">
                  <img className="small" src={item.image} alt={item.name}></img>

                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      className=""
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option keys={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              {/*REDUCE: array.reduce(function(total, currentValue, currentIndex, arr), initialValue) */}
              ,
              {/* We have products in the array, so we access its information c.qty or c.price */}
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (a, obj) => parseInt(a) + parseInt(obj.qty),
                  0
                )}{" "}
                items): ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
