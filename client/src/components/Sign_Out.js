import React from "react";
import { Link } from "react-router-dom";

const SignOut = () => {
  return (
    <div className="not-found">
      <h2>Are you sure you want to sign out?</h2>
      <p>
        <Link to={`/`}>Click here to sign out</Link>
      </p>
    </div>
  );
};

export default SignOut;