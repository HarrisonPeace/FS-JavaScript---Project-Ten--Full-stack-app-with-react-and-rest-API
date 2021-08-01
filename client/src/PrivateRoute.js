import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./components/Context/Context";

/**
 * Private Route module.
 * @description Creates a private route by passing a regular route (as a call back) through an if statement
 *              If there is an authenticated user, send user to specified route if no authenticated user send user to login screen.
 *
 * @Param Call back route (see App.js or Course.js for private routes)
 * @Return Route within authentication function
 */

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest} // add any route conditions back in
          render={({ location }) =>
            context.authenticatedUser ? ( // if authenticated user
              children // return route
            ) : (
              // else redirect to login
              <Redirect
                to={{
                  pathname: "/sign-in",
                  state: { from: location }, //record location in order to send user back after login
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};

export default PrivateRoute;
