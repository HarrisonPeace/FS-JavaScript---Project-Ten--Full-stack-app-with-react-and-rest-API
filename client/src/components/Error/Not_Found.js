import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="wrap">
      <h2>Page Not Found</h2>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <p>
        <Link to={`/`}>Return Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
