import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="form--centered">
      <h2>Log In</h2>
      <form>
        <label for="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value=""
        />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" value=""/>
        <button className="button" type="submit">
          Sign In
        </button>
        <button
          className="button button-secondary"
          onclick="event.preventDefault(); location.href='index.html';"
        >
          Cancel
        </button>
      </form>
      <p>
        <Link to={`/sign-up`}>Don't have a user account? <strong>Sign Up Here!</strong></Link>
      </p>
    </div>
  );
};

export default SignIn;
