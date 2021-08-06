import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

// Component Imports
import Loading from "./Loading";
import { errorHandler, ErrorInline } from "./Error/Error";

const SignUp = ({ context }) => {
  //Create history reference
  let history = useHistory();

  // Create references to show and hide hints
  let firstNameHint = useRef(null);
  let lastNameHint = useRef(null);
  let emailHint = useRef(null);
  let passwordHints = useRef(null);

  // Create state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ title: "Error", message: [] });
  const [loading, setLoading] = useState(false);

  const isValidEmail = () => {
    if (/^[^@]+@([a-z]|\d|-)+.com$/.test(emailAddress)) {
      // if usual email format
      emailHint.current.style.display = "none";
      return true;
    } else if (emailAddress === "") {
      // if empty
      emailHint.current.innerHTML = "*cannot be blank";
      emailHint.current.style.display = "inline";
      return false;
    } else {
      // if not empty and not formatted correctly
      emailHint.current.innerHTML = "*must be formatted correctly";
      emailHint.current.style.display = "inline";
      return false;
    }
  };

  const isValidName = (name) => {
    let value;
    name === "FN" ? (value = firstName) : (value = lastName); // assign either first name or last name to test value
    if (/[a-zA-Z]/.test(value)) {
      //test for at least one letter
      name === "FN"
        ? (firstNameHint.current.style.display = "none")
        : (lastNameHint.current.style.display = "none");
      return true;
    } else {
      name === "FN"
        ? (firstNameHint.current.style.display = "inline")
        : (lastNameHint.current.style.display = "inline");
      return false;
    }
  };

  const isValidPassword = () => {
    let errors = "";
    if (password.length < 6 || password.length > 20) {
      //test if password is between 6and 20 characters
      errors +=
        '<p class="form-error">*Password must be between 6 and 20 characters</p>';
    }
    if (!/[A-Z]/.test(password)) {
      //test for at least one capital letter
      errors +=
        '<p class="form-error">*Password must contain at least one capital letter</p>';
    }
    if (!/[^\d\w\s]/.test(password)) {
      //test for at least one special character
      errors +=
        '<p class="form-error">*Password must contain at least one special character</p>';
    }
    if (password !== confirmPassword) {
      //test password and confirm password match
      errors += `<p class="form-error">*Passwords don't match</p>`;
    }
    if (errors) {
      //if errors show errors and return false
      passwordHints.current.innerHTML = errors;
      return false;
    } else {
      passwordHints.current.innerHTML = "";
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form submitting
    let vFirstName = isValidName("FN"); //confirm first name has been validated
    let vLastName = isValidName("LN"); //confirm last name has been validated
    let vEmail = isValidEmail(); //confirm email has been validated
    let vPassword = isValidPassword(); //confirm password has been validated
    if (vFirstName && vLastName && vEmail && vPassword) {
      //check if error with any component
      setLoading(true); //show loading screen
      context.actions
        .signUp(firstName, lastName, emailAddress, password) //await user creation in api
        .then((user) => {
          history.push("/");
        }) //if success return user to courses screen
        .catch((error) => {
          //if error with sign up show error
          setLoading(false);
          const ServerErrors = errorHandler(error);
          setError(ServerErrors);
        });
    }
  };

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : null /* show loading screen while form is being submitted */
      }
      <div className="form--centered">
        <h2>Sign Up</h2>
        {
          error.message.length === 0 ? null : (
            <ErrorInline error={error} />
          ) /* error container server errors */
        }
        <form onSubmit={handleSubmit}>
          <label>
            First Name{" "}
            <span
              ref={firstNameHint}
              style={{ display: "none" }}
              className="form-error"
            >
              *cannot be blank
            </span>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyUp={() => isValidName("FN")}
            />
          </label>
          <label>
            Last Name{" "}
            <span
              ref={lastNameHint}
              style={{ display: "none" }}
              className="form-error"
            >
              *cannot be blank
            </span>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyUp={() => isValidName("LN")}
            />
          </label>
          <label>
            Email Address{" "}
            <span
              ref={emailHint}
              style={{ display: "none" }}
              className="form-error"
            >
              *cannot be blank
            </span>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              onKeyUp={isValidEmail}
            />
          </label>
          <label style={{ position: "relative" }}>
            Password
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyUp={isValidPassword}
            />
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="show-password"
              onClick={context.actions.showPassword}
            >
              <path d="m34,256l26.2,26.2c108,108 283.7,108 391.7,0l26.1-26.2-26.2-26.2c-108-108-283.7-108-391.7,0l-26.1,26.2zm222,126.2c-75.8,0-151.6-28.9-209.3-86.6l-32.9-32.9c-3.7-3.7-3.7-9.7 0-13.5l32.9-32.9c115.4-115.4 303.2-115.4 418.6,0l32.9,32.9c3.7,3.7 3.7,9.7 0,13.5l-32.9,32.9c-57.7,57.7-133.5,86.6-209.3,86.6z" />
              <path d="m256,183.5c-40,0-72.5,32.5-72.5,72.5s32.5,72.5 72.5,72.5c40,0 72.5-32.5 72.5-72.5s-32.5-72.5-72.5-72.5zm0,164c-50.5,0-91.5-41.1-91.5-91.5 0-50.5 41.1-91.5 91.5-91.5s91.5,41.1 91.5,91.5c0,50.5-41,91.5-91.5,91.5z" />
            </svg>
          </label>
          <label style={{ position: "relative" }}>
            Confirm Password
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyUp={isValidPassword}
            />
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="show-password"
              onClick={context.actions.showPassword}
            >
              <path d="m34,256l26.2,26.2c108,108 283.7,108 391.7,0l26.1-26.2-26.2-26.2c-108-108-283.7-108-391.7,0l-26.1,26.2zm222,126.2c-75.8,0-151.6-28.9-209.3-86.6l-32.9-32.9c-3.7-3.7-3.7-9.7 0-13.5l32.9-32.9c115.4-115.4 303.2-115.4 418.6,0l32.9,32.9c3.7,3.7 3.7,9.7 0,13.5l-32.9,32.9c-57.7,57.7-133.5,86.6-209.3,86.6z" />
              <path d="m256,183.5c-40,0-72.5,32.5-72.5,72.5s32.5,72.5 72.5,72.5c40,0 72.5-32.5 72.5-72.5s-32.5-72.5-72.5-72.5zm0,164c-50.5,0-91.5-41.1-91.5-91.5 0-50.5 41.1-91.5 91.5-91.5s91.5,41.1 91.5,91.5c0,50.5-41,91.5-91.5,91.5z" />
            </svg>
          </label>
          <div ref={passwordHints}></div>
          <div className="button-container">
            <button className="button" type="submit">
              Sign Up
            </button>
            <button
              className="button button-secondary"
              onClick={() => history.push("/")}
            >
              Cancel
            </button>
          </div>
        </form>
        <p style={{ textAlign: "center", marginBottom: 0 }}>
          <Link to={`/sign-in`}>
            Already have a user account? <strong>Sign In Here!</strong>
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
