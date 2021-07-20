import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="not-found">
      <h2>Forbidden</h2>
      <p>Oh oh! You can't access this page.</p>
      <p>
        <Link to={`/`}>Return Home</Link>
      </p>
    </div>
  );
};

export default Forbidden;
