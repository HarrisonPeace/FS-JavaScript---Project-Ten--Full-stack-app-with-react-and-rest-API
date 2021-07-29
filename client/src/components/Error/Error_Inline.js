import React, { useEffect, useState } from "react";

import withContext from '../Context/Context';

const ErrorInline = ({ context, errors }) => {
  console.log(errors)

  let isUnexpectedError = errors.includes('Sorry! An unexpected error just occurred, please try again.')

  const [status, setStatus] = useState(null);

    useEffect(() => {
      if (isUnexpectedError) {
        context.actions.checkServer()
        .then(status => setStatus(status.data.status))
        .catch(error => setStatus('Server Unresponsive'))
      }
    }, [context, isUnexpectedError]);


  return (
    <div className="validation--errors">
    <h3>Error:</h3>
      <ul>
        { 
          errors.map((error, index) => <li key={`err${index}`}>{error}</li>)
        }
        { isUnexpectedError ?
          <>
            <li>Current Server Status:</li>
            <ul style={{ listStyleType: 'none', marginLeft: '0'}}>
              { status ?
                  <li><strong>{status}</strong></li>
                :
                  <li><strong>Please wait while we check the connection</strong></li>
              }
            </ul>
          </>
        : 
          null
        }
      </ul>
    </div>
  );
};

const ErrorInlineWithContext = withContext(ErrorInline);

export default ErrorInlineWithContext;



