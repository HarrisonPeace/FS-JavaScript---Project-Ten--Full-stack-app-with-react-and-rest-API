import React, { useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";

//import URL configuration for api URL
import config from "./config";

//create react context
const Context = React.createContext();

export const Provider = (props) => {
  //create date object for cookie expiry {1 day from now}
  let cookieExpiry = new Date();
  cookieExpiry.setDate(cookieExpiry.getDate() + 1);

  //create authenticated user cookie
  const [cookies, setCookie, removeCookie] = useCookies(["authenticatedUser"]);
  //set authenticated user state using cookie or to null {no user}
  const [authenticatedUser, setAuthenticatedUser] = useState(
    cookies.authenticatedUser || null
  );

  /**
   * @description Change password input from type="password" to type="text"
   * @Param event object {svg eye icon}
   */
  const showPassword = (e) => {
    let password;
    //select password input depending if path or svg is clicked
    e.target.nodeName === "svg"
      ? (password = e.target.previousElementSibling)
      : (password = e.target.parentElement.previousElementSibling);
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  /**
   * @description Convert provided params into api call using axios
   * @Param path = url
   * @param method = http method
   * @param data = http body
   * @param requiresAuth = boolean
   * @param username = email
   * @param password
   * @Return formatted axios api call
   */
  const api = (
    path,
    method = "GET",
    data = null,
    requiresAuth = false,
    username = null,
    password = null
  ) => {
    const options = {
      url: `${config.apiBaseUrl}${path}`,
      method,
      data,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    // Check if auth is required
    if (requiresAuth) {
      options.auth = {};
      options.auth.username = username || authenticatedUser.emailAddress;
      options.auth.password = password || authenticatedUser.password;
    }

    return axios(options);
  };

  /**
   * @description Check if server is working by sending a get request to index page
   * @Return response object as a promise
   */
  const checkServer = async () => {
    const serverStatus = await api("/");
    return serverStatus;
  };

  /**
   * @description request all courses from api
   * @Return response object as a promise
   */
  const getCourses = async () => {
    const courses = await api(`/courses`);
    return courses;
  };

  /**
   * @description request single course from api
   * @Return response object as a promise
   */
  const getCourse = async (id) => {
    const course = await api(`/courses/${id}`);
    return course;
  };

  /**
   * @description send post request to api attempting to create new course
   * @param course title, description, estimatedTime, materialsNeeded
   * @Return response object as a promise
   */
  const createCourse = async (
    title,
    description,
    estimatedTime,
    materialsNeeded
  ) => {
    const newCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authenticatedUser.id,
    };
    const course = await api(`/courses`, "POST", newCourse, true);
    return course;
  };

  /**
   * @description send put request to api attempting to update course
   * @param course id, title, description, estimatedTime, materialsNeeded
   * @Return response object as a promise
   */
  const updateCourse = async (
    id,
    title,
    description,
    estimatedTime,
    materialsNeeded
  ) => {
    const updatedCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authenticatedUser.id,
    };
    const course = await api(`/courses/${id}`, "PUT", updatedCourse, true);
    return course;
  };

  /**
   * @description send delete request to api attempting to delate course
   * @param course id
   * @Return response object as a promise
   */
  const deleteCourse = async (id) => {
    const course = await api(`/courses/${id}`, "DELETE", null, true);
    return course;
  };

  /**
   * @description attempt to authenticate user by requesting authentication from api
   *              If authentication successful set authenticated user
   * @param user email {username} and password
   * @Return response object as a promise
   */
  const signIn = async (username, password) => {
    const user = await api(`/users`, "GET", null, true, username, password);
    setAuthUser(user.data.user, password);
    return user;
  };

  /**
   * @description attempt to create new user by sending post request to api
   *              If user creation successful attempt sign in
   * @param new user firstName, lastName, emailAddress, password
   * @Return response object as a promise
   */
  const signUp = async (firstName, lastName, emailAddress, password) => {
    await api(`/users`, "POST", {
      firstName,
      lastName,
      emailAddress,
      password,
    });
    return signIn(emailAddress, password);
  };

  /**
   * @description set the authenticated user to state and cookies
   * @param user @object and password
   * @Return response object as a promise
   */
  function setAuthUser(user, password) {
    user.password = password;
    setAuthenticatedUser(user);
    setCookie("authenticatedUser", JSON.stringify(user), {
      path: "/",
      expires: cookieExpiry,
    });
    return user;
  }

  /**
   * @description remove authenticated user from state and cookies
   */
  const signOut = () => {
    setAuthenticatedUser(null);
    removeCookie("authenticatedUser", {
      path: "/",
      expires: cookieExpiry,
    });
  };

  return (
    <Context.Provider
      value={{
        authenticatedUser,
        actions: {
          checkServer,
          signIn,
          signOut,
          signUp,
          getCourses,
          getCourse,
          createCourse,
          updateCourse,
          deleteCourse,
          showPassword,
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer as well as cookie consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <CookiesProvider>
        <Context.Consumer>
          {(context) => <Component {...props} context={context} />}
        </Context.Consumer>
      </CookiesProvider>
    );
  };
}
