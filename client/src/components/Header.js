import React from "react";
import { NavLink } from "react-router-dom";

//Header Component
const Header = ({ context }) => {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <NavLink to={`/`}>{"Courses"}</NavLink>
        </h1>
        <nav>
          {context.authenticatedUser /* if there is an authenticated user show name and sign out button */ ? (
            <ul className="header--signed-in">
              <li>
                Welcome, {context.authenticatedUser.firstName}{" "}
                {context.authenticatedUser.lastName}!
              </li>
              <li>
                <NavLink to={`/sign-out`}>{"Sign Out"}</NavLink>
              </li>
            </ul>
          ) : (
            /* else show sign up and sign out buttons
             ******** Note "Log In" has been instead of "Sign Up"as Link text for UX purposes
             ******** "Sign In" is to similar to "Sign Up" making sign in link harder to recognize for frequent users
             */
            <ul className="header--signed-out">
              <li>
                <NavLink to={`/sign-in`}>{"Log In"}</NavLink>
              </li>
              <li>
                <NavLink to={`/sign-up`}>{"Sign Up"}</NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
