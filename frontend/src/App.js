import { Route, Routes, Link, useNavigate} from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { useSelector, useDispatch } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import {signout} from './actions/userActions'
import { ShippingAddressScreen } from "./screens/ShippingAddressScreen";
import { PaymentMethodsScreen } from "./screens/PaymentMethodsScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
  //the function useSeletor allow us to access the store and its states, we'll get the cart state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signoutHandler =()=>{
    dispatch(signout());
    navigate('/')
  }

  return (
    
      <div className="grid-container">
        <header className="row">
          <Link className="brand" to="/">
            amazona
          </Link>

          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>

            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Signin</Link>
            )}
          </div>
        </header>
        
        <main>
          {/* Using react-router-dom to load parts of the webpage */}
          <Routes>
            <Route path="/cart">
              <Route path="" element={<CartScreen />}></Route>

              <Route path=":id" element={<CartScreen />}></Route>
            </Route>
            <Route
              path="/products/:id"
              element={<ProductScreen />}
              exact
            ></Route>

            <Route path="/signin/" element={<SigninScreen />}></Route>
            <Route path="/register/" element={<RegisterScreen />}></Route>
            <Route path="/shipping/" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment/" element={<PaymentMethodsScreen />}></Route>
            <Route path="/placeOrder/" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>

            <Route path="/" element={<HomeScreen />} exact></Route>
          </Routes>
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    
  );
}

export default App;
