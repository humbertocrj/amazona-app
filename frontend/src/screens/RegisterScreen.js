import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox ";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const navigate = useNavigate();

  const submitHandler = (e) => {
    // When submit que form the page is not refreshed.
    e.preventDefault();
    //TODO: Signin action
    if(password !== confirmPassword) {
      alert('Password and confirm password are not the same.')
    }else{
    dispatch(register(name, email, password));

    }
  };

  let { search } = useLocation();
  const redirect = search ? search.split("=")[1] : "/";

  useEffect(() => {
    //If the user is logged in, redirect to shipping. The userInfo is a state and it is
    //saved in localStorage(store.js, initialState)
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Register</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="Enter your name."
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">E-mail address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email."
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password."
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Enter confirm password."
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <label />
          <button type="submit" className="primary">
            Register
          </button>
        </div>
        <div>
          <label></label>
          <div>
            Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
