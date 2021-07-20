import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="not-found">
      <h2>Error</h2>
      <p>Sorry! We just encountered an unexpected error.</p>
      <p>
        <Link to={`/`}>Return Home</Link>
      </p>
    </div>
  );
};

export default Error;
