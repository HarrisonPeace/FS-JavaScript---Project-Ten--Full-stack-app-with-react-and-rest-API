import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Error = ({ context, error }) => {

  const [status, setStatus] = useState(null);

  useEffect(() => {
    context.actions.checkServer()
    .then(status => setStatus(status.data.status))
    .catch(error => setStatus('Server Unresponsive'))
  }, [context]);

  return (
    <div className="wrap">
      {
        error ?
        <>
          <h2>Error</h2>
          <p>Sorry! An unexpected error just occurred, please try again.</p>
        </>
        : null
      }
      <p>Current Server Status:</p>
      { status ?
          <p><strong>{status}</strong></p>
        :
          <p><strong>Please wait while we check the connection</strong></p>
      }
      
      <p>
        <Link to={`/`}>Return Home</Link>
      </p>
    </div>
  );
};

export default Error;
