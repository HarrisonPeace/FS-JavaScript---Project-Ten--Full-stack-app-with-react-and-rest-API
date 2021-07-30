import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorInline from './Error/Error_Inline';
import { errorHandler } from './Error/error_Handler';

const SignOut = ({ context }) => {

  let history = useHistory();
  const [error, setError] = useState({title: 'Error', message:[]});

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form submitting if there is an error
    try {
      context.actions.signOut()
      history.push('/courses')
    } catch {
      const ServerErrors = errorHandler(error)
      setError(ServerErrors)
    }
  }

  return (
    <>
    <div className="form--centered">
    <h2>Are you sure you want to sign out?</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
        <div className="button-container">
          <button className="button" type="submit">Sign Out</button>
          <button className="button button-secondary" onClick={() => history.push('/')}>Cancel</button>
        </div>
      </form>
    </div>
    { error.message.length === 0 ? null : <ErrorInline error={error}/> }
    </>
  );
};

export default SignOut;