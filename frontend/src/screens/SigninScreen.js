import React, { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import {signin} from '../actions/userActions'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox ";


export default function SigninScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo, loading, error} = userSignin;
  
    const navigate = useNavigate()
    

    const submitHandler = (e) => {
        // When submit que form the page is not refreshed.
        e.preventDefault();
        //TODO: Signin action
        dispatch(signin(email, password))
    }


    let {search} = useLocation();
    const redirect = (search? "/"+search.split('=')[1]: '/')

    useEffect(() => {
       //If the user is logged in, redirect to shipping. The userInfo is a state and it is 
       //saved in localStorage(store.js, initialState)
      if(userInfo){
        navigate(redirect)
      }
    },[userInfo, navigate, redirect])

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error&& <MessageBox variant='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor="email">E-mail address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email."
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
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
            <label />
            <button type="submit" className="primary">Sign In</button>
        </div>
        <div>
            <label></label>
            <div>
                New Costumer?{' '}
                <Link to={'/register'}>Create your account</Link>
            </div>
        </div>
      </form>
    </div>
  );
}
