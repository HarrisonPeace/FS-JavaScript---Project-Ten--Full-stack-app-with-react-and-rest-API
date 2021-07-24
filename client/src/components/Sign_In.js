import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

const SignIn = ({ context }) => {

  let history = useHistory();
  let serverError = useRef(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form submitting if there is an error
      context.actions.signIn(emailAddress, password)
      .then(user => { history.push('/courses') })
      .catch(error => {
        if(error.message === 'Access Denied') {
          serverError.current.innerHTML = `${error.message}`
          serverError.current.style.display = "inline-block"
        } else {
          history.push('/error')
        }
    })
  }

  return (
    <div className="form--centered">
      <h2>Log In</h2>
      <h3 className="error" ref={serverError}>*An error occurred with the server*</h3>
      <form onSubmit={handleSubmit}>
        <label>Email Address
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress} 
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </label>
        <label>Password
          <input 
            id="password" 
            name="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="button" type="submit">Sign In</button>
        <button className="button button-secondary" onClick={() => history.push('/')}>Cancel</button>
      </form>
      <p>
        <Link to={`/sign-up`}>Don't have a user account? <strong>Sign Up Here!</strong></Link>
      </p>
    </div>
  );
};

export default SignIn;
