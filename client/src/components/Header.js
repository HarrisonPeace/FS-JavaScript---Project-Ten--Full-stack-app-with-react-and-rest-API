import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ context } ) => {

  return (
    <>
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <NavLink to={`/`}>{"Courses"}</NavLink>
          </h1>
          <nav>
            {context.authenticatedUser ? (
              <ul className="header--signed-in">
                <li>Welcome, {context.authenticatedUser.name}!</li>
                <li>
                  <NavLink to={`/sign-out`}>{"Sign Out"}</NavLink>
                </li>
              </ul>
            ) : (
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
    </>
  );
};

export default Header;
