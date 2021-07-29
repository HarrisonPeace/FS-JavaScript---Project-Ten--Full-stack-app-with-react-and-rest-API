import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './components/Context/Context';

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Consumer>
      {context => (
      <Route
        {...rest}
        render={({ location }) =>
          context.authenticatedUser ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: location }
              }}
            />
          )
        }
      />
    )}
  </Consumer>
  );
}

export default PrivateRoute;