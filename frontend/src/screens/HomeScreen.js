import React, { useEffect, useState } from "react";
//No more necessary, data coming from backend now.
// import data from "../data";
import Product from "../components/Product";
import axios from "axios";
import MessageBox from "../components/MessageBox ";
import LoadingBox from "../components/LoadingBox";

// Instead of get the informatino from data.js, we gonna fetch the data from
//backend, we need: ALTER THE package.json in frontend, after "name", add "proxy": "http://127.0.0.1:5000"
//That is address of our backend. So we need to install axios (npm install axios)
export default function HomeScreen() {
  //THE CODE BELOW IS USED TO GET DATA FROM BACKEND
  //React hook to manage the component state
  const [products, setProducts] = useState([]);

  //Used to show loading icon while frontend is loading data from backend
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  //This useEffect function will be executed when the component is loaded only one time.
  //Second parameter accepts an arrays with a list of dependencies
  useEffect(() => {
    //Before trying to fetch data start loading icon
    setLoading(true);

    //Creating fetchData function
    const fetchData = async () => {
      try {
        //FETCHING DATA FROM BACKEND
        const { data } = await axios.get("/api/products");
        //Set the state with the data from the backend
        setProducts(data);

        //After data is loaded, remove loading icon
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    //Calling function to get products
    fetchData();
  }, []);
  //THE CODE ABOVE IS USED TO GET DATA FROM BACKEND

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="row center">
      {products.map((product) => {
        return <Product key={product._id} product={product} />;
      })}
    </div>
  );
}
