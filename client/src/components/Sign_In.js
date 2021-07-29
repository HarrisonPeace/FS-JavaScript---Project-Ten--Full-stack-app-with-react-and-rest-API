import React, { useState, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

const SignIn = ({ context }) => {

  let accessError = useRef(null);
  let history = useHistory();
  let location = useLocation();
  let passwordInput = useRef(null);
  let { from } = location.state || { from: { pathname: "/courses" } };
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form submitting if there is an error
      context.actions.signIn(emailAddress, password)
      .then(user => { history.replace(from); })
      .catch(error => {
        if(error.message === 'Access Denied') {
          accessError.current.style.display = "inline-block"
        } else {
          history.push('/error')
        }
    })
  }

  const showPassword = () => {
    if(passwordInput.current.type === "password") {
      passwordInput.current.type = "text";
    } else {
      passwordInput.current.type = "password";
    }
  }

  return (
    <div className="form--centered">
      <h2>Log In</h2>
      <div className="validation--errors" ref={accessError} style={{ display: 'none'}}>
        <h3>Access Denied</h3>
          <p style={{ marginBottom: '0' }}>Wrong email address and/or password</p>
      </div>
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
        <label style={{ position: "relative" }}>Password
          <input
            ref={passwordInput}
            id="password" 
            name="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="show-password" onClick={showPassword}>
            <path d="m34,256l26.2,26.2c108,108 283.7,108 391.7,0l26.1-26.2-26.2-26.2c-108-108-283.7-108-391.7,0l-26.1,26.2zm222,126.2c-75.8,0-151.6-28.9-209.3-86.6l-32.9-32.9c-3.7-3.7-3.7-9.7 0-13.5l32.9-32.9c115.4-115.4 303.2-115.4 418.6,0l32.9,32.9c3.7,3.7 3.7,9.7 0,13.5l-32.9,32.9c-57.7,57.7-133.5,86.6-209.3,86.6z"/>
            <path d="m256,183.5c-40,0-72.5,32.5-72.5,72.5s32.5,72.5 72.5,72.5c40,0 72.5-32.5 72.5-72.5s-32.5-72.5-72.5-72.5zm0,164c-50.5,0-91.5-41.1-91.5-91.5 0-50.5 41.1-91.5 91.5-91.5s91.5,41.1 91.5,91.5c0,50.5-41,91.5-91.5,91.5z"/>
          </svg>
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
