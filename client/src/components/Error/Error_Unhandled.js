import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Error = ({ context }) => {
  //set state
  const [status, setStatus] = useState(null);

  useEffect(() => {
    context.actions
      .checkServer() //On mount check current server status
      .then((status) => setStatus(status.data.status)) //If successful show message
      .catch((error) => setStatus("Server Unresponsive")); //else show server is unresponsive
  }, [context]);

  return (
    <div className="wrap">
      <h2>Error</h2>
      <p>Sorry! An unexpected error just occurred, please try again.</p>
      <p>Current Server Status:</p>
      {status ? ( //await server status
        <p>
          <strong>{status}</strong>
        </p>
      ) : (
        //show while waiting for server
        <p>
          <strong>Please wait while we check the connection</strong>
        </p>
      )}
      <p>
        <Link className="button button-secondary" to="/courses">
          Return Home
        </Link>
      </p>
    </div>
  );
};

export default Error;
