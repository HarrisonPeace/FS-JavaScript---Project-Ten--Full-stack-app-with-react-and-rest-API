import React, { useState } from 'react';
import { 
  CookiesProvider,
  useCookies,
} from 'react-cookie';
import Data from './Data';

const Context = React.createContext();

export const Provider = (props) => {

  const data = new Data();
  let cookieExpiry = new Date();
      cookieExpiry.setDate(cookieExpiry.getDate() + 1);
  const [cookies, setCookie, removeCookie] = useCookies(['authenticatedUser']);
  const [authenticatedUser, setAuthenticatedUser] = useState(cookies.authenticatedUser || null);

  const checkServer = async () => {
    const serverStatus = await data.checkServer()
    return serverStatus;
  }

  const getCourses = async () => {
    const courses = await data.getCourses()
    return courses; 
  }

  const getCourse = async (id) => {
    const course = await data.getCourse(id)
    return course;
  }

  const createCourse = async (title, description, estimatedTime, materialsNeeded) => {
    const newCourse = { title, description, estimatedTime, materialsNeeded, userId: authenticatedUser.id}
    const course = await data.createCourse(newCourse, authenticatedUser.emailAddress, authenticatedUser.password)
    return course;
  }

  const updateCourse = async (id, title, description, estimatedTime, materialsNeeded) => {
    const updatedCourse = { title, description, estimatedTime, materialsNeeded, userId: authenticatedUser.id}
    const course = await data.updateCourse(id, updatedCourse, authenticatedUser.emailAddress, authenticatedUser.password)
    return course;
  }

  const deleteCourse = async (id) => {
    const course = await data.deleteCourse(id, authenticatedUser.emailAddress, authenticatedUser.password)
    return course;
  }

  const signIn = async (username, password) => {
    const user = await data.getUser(username, password)
    setAuthUser (user.data.user, password)
    return user;
  }

  const signUp = async (firstName, lastName, emailAddress, password) => {
    await data.createUser({firstName, lastName, emailAddress, password})
    return signIn(emailAddress, password);
  }

  function setAuthUser (user, password) {
    user.password = password;
    setAuthenticatedUser(user);
    setCookie('authenticatedUser', JSON.stringify(user), {
      path: '/',
      expires: cookieExpiry
    });
    return user;
  }

  const signOut = () => {
    setAuthenticatedUser(null);
    removeCookie('authenticatedUser', {
      path: '/',
      expires: cookieExpiry
    })
  }

  return (
    <Context.Provider value={{
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
      }
    }}>
      { props.children }
    </Context.Provider>
  );
}


export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
    <CookiesProvider>
      <Context.Consumer>
          {context => <Component {...props} context={context} />}
      </Context.Consumer>
    </CookiesProvider>
    );
  }
}