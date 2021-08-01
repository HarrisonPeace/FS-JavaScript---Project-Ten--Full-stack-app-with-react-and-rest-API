import React, { useEffect, useState } from "react";

import withContext from "../Context/Context";
import NotFound from "./Not_Found";

const ErrorInline = ({ context, error }) => {
  //check if server status is in doubt
  let isUnexpectedError =
    error.title.includes("Unexpected Error") ||
    error.title.includes("Server Error");

  //set state
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (isUnexpectedError) {
      //if unexpected or server error
      context.actions
        .checkServer() //check current server status
        .then((status) => setStatus(status.data.status)) //If successful show message
        .catch(() => setStatus("Server Unresponsive")); //else show server is unresponsive
    }
  }, [context, isUnexpectedError]);

  if (error.title === "Not Found") {
    return <NotFound />; //show not found component if page not found error
  }
  return (
    <div className="validation--errors form--centered">
      <h3>{error.title}</h3>
      <ul>
        {
          error.message.length === 1 ? (
            <li style={{ listStyleType: "none", marginLeft: "-18px" }}>
              {error.message}
            </li>
          ) : (
            error.message.map((errorM, index) => (
              <li key={`err${index}`}>{errorM}</li>
            ))
          ) /* map over errors and convert to HTML */
        }
        {isUnexpectedError /* show check server error if server status is in doubt */ ? (
          <li style={{ listStyleType: "none", marginLeft: "-18px" }}>
            {"Current Server Status: "}
            {status ? (
              <strong>{status}</strong>
            ) : (
              <strong>Please wait while we check the connection</strong>
            )}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

const ErrorInlineWithContext = withContext(ErrorInline);

export default ErrorInlineWithContext;
