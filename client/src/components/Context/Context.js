import React, { useState } from 'react';
import { 
  CookiesProvider,
  useCookies,
} from 'react-cookie';
import Data from './Data';

const Context = React.createContext();

export const Provider = (props) => {

  const data = new Data();
  const [cookies, setCookie, removeCookie] = useCookies(['authenticatedUser']);
  const [authenticatedUser, setAuthenticatedUser] = useState(cookies.authenticatedUser || null);

  const checkServer = async () => {
    const serverStatus = await data.checkServer()
    .catch(errorHandler);
    return serverStatus;
  }

  const getCourses = async () => {
    const courses = await data.getCourses()
    .catch(errorHandler);
    return courses; 
  }

  const getCourse = async (id) => {
    const course = await data.getCourse(id)
   .catch(errorHandler)
    return course;
  }

  const createCourse = async (title, description, estimatedTime, materialsNeeded) => {
    const newCourse = { title, description, estimatedTime, materialsNeeded, userId: authenticatedUser.id}
    const course = await data.createCourse(newCourse, authenticatedUser.emailAddress, authenticatedUser.password)
    .catch(errorHandler)
    return course;
  }

  const updateCourse = async (id, title, description, estimatedTime, materialsNeeded) => {
    const updatedCourse = { title, description, estimatedTime, materialsNeeded, userId: authenticatedUser.id}
    const course = await data.updateCourse(id, updatedCourse, authenticatedUser.emailAddress, authenticatedUser.password)
    .catch(errorHandler)
    return course;
  }

  const deleteCourse = async (id) => {
    const course = await data.deleteCourse(id, authenticatedUser.emailAddress, authenticatedUser.password)
    .catch(errorHandler)
    return course;
  }

  const signIn = async (username, password) => {
    const user = await data.getUser(username, password)
    .catch(errorHandler);
    let authUser = user.data.user
    authUser.password = password;
    let date = new Date();
    date.setDate(date.getDate() + 1);
    setAuthenticatedUser(authUser);
    setCookie('authenticatedUser', JSON.stringify(authUser), {
      path: '/',
      expires: date
    });
    return user;
  }

  const signUp = async (firstName, lastName, emailAddress, password) => {
    const newUser = {firstName, lastName, emailAddress, password}
    const user = await data.createUser(newUser)
    .catch(errorHandler);
    if (user !== null) {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      setAuthenticatedUser(newUser);
      setCookie('authenticatedUser', newUser, {
        path: '/',
        expires: date
      });
    }
    return user;
  }

  const signOut = () => {
    setAuthenticatedUser(null);
    removeCookie('authenticatedUser')
  }

  /* Handler function to catch async and sequelize errors */
  function errorHandler (error) {
    if(error.response) {
      switch (error.response.status) {
        case 400: //bad request (invalid syntax)
          let message = error.response.data.error;
          let formattedMessage = message.map(message => {
            if(message) return `<p class="server-error-message">${message}</p>`
            else return null
          }).join(' ')
          throw new Error(formattedMessage) 
        case 401:
          break; //bad credentials
        case 404:
          throw new Error()
        case 403:
          break; //no permission
        case 500:
          break; //internal server error
        default:
          throw new Error('Unexpected Error') 
      }
    } else {
      throw new Error('Unexpected Error')
    }
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
};

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