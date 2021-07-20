import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="form--centered">
      <h2>Sign Up</h2>

      <form>
        <label for="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" value=""/>
        <label for="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" value=""/>
        <label for="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value=""
        ></input>
        <label for="password">Password</label>
        <input id="password" name="password" type="password" value=""/>
        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value=""
        />
        <button className="button" type="submit">
          Sign Up
        </button>
        <button
          className="button button-secondary"
          onclick="event.preventDefault(); location.href='index.html';"
        >
          Cancel
        </button>
      </form>
      <p>
        <Link to={`/sign-in`}>Already have a user account? <strong>Sign In Here!</strong></Link>
      </p>
    </div>
  );
};

export default Error;
