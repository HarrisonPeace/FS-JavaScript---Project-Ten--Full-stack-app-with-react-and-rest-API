import React from "react";
import { useHistory } from "react-router-dom";

const SignOut = ({ context }) => {
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form submitting
    context.actions.signOut(); //Sign user out
    history.push("/courses"); //redirect to courses screen
  };

  return (
    <div className="form--centered">
      <h2>Are you sure you want to sign out?</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
        <div className="button-container">
          <button className="button" type="submit">
            Sign Out
          </button>
          <button
            className="button button-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignOut;
