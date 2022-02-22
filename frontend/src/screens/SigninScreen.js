import React, { useState } from "react";
import {Link} from 'react-router-dom'

export default function SigninScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        // When submit que form the page is not refreshed.
        e.preventDefault();

        //TODO: Signin action
    }
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
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
