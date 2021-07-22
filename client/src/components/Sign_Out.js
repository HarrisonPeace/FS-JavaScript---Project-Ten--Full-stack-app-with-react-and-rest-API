import React from "react";
import { useHistory } from "react-router-dom";

const SignOut = ({ context }) => {

  let history = useHistory();

  return (
    <div className="not-found">
      <h2>Are you sure you want to sign out?</h2>
      <p>
        <button type="button" onClick={()=> {context.actions.signOut(); history.push('/courses')}} >
          Click here to sign out
        </button>
      </p>
    </div>
  );
};

export default SignOut;