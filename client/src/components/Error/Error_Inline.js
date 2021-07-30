import React, { useEffect, useState } from "react";

import withContext from '../Context/Context';
import NotFound from './Not_Found'

const ErrorInline = ({ context, error }) => {

  let isUnexpectedError = error.title.includes('Unexpected Error')

  const [status, setStatus] = useState(null);

    useEffect(() => {
      if (isUnexpectedError) {
        context.actions.checkServer()
        .then(status => setStatus(status.data.status))
        .catch(() => setStatus('Server Unresponsive'))
      }
    }, [context, isUnexpectedError]);

  if(error.title === 'Not Found') {
    return <NotFound />
  }
  return (
    <div className="validation--errors form--centered">
      <h3>{error.title}</h3>
      <ul>
        { error.message.length === 1 ?
          <li style={{ listStyleType: 'none', marginLeft: '-18px'}}>{error.message}</li>
          :
          error.message.map((errorM, index) => <li key={`err${index}`}>{errorM}</li>)
        }
        { isUnexpectedError ?
            <li style={{ listStyleType: 'none', marginLeft: '-18px'}}>{'Current Server Status: '}                
              { status ?
                     <strong>{status}</strong>
                  :
                     <strong>Please wait while we check the connection</strong>
              }
            </li>
        : 
          null
        }
      </ul>
    </div>
  );
};

const ErrorInlineWithContext = withContext(ErrorInline);

export default ErrorInlineWithContext;



