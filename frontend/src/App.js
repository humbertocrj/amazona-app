import { BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
 

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <a className="brand" href="/">
            amazona
          </a>

          <div>
            <a href="/cart">Cart</a>
            <a href="/signing">Signin</a>
          </div>
        </header>
        <main>
          {/* Using react-router-dom to load parts of the webpage */}
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/products/:id" element={<ProductScreen />} exact></Route>
          </Routes>
         
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
