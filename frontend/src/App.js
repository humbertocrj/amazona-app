import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {useSelector} from 'react-redux'

function App() {
 
  //the function useSeletor allow us to access the store and its states, we'll get the cart state
  const cart = useSelector(state =>state.cart)
  const {cartItems} = cart
  
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <Link className="brand" to="/">
            amazona
          </Link>

          <div>
            <Link to="/cart">Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
            </Link>
            <Link to="/signing">Signin</Link>
          </div>
        </header>
        <main>
          {/* Using react-router-dom to load parts of the webpage */}
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/products/:id" element={<ProductScreen />} exact></Route>
            <Route path="/cart/:id" element={<CartScreen />} exact></Route>
          </Routes>
         
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
