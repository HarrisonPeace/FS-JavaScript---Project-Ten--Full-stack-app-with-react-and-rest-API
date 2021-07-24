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
  const [loading, setLoading] = useState(true);
  const [authenticatedUser, setAuthenticatedUser] = useState(cookies.authenticatedUser || null);

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

  const signIn = async (username, password) => {
    const user = await data.getUser(username, password)
    .catch(errorHandler);
    if (user !== null) {
      console.log(user)
      user.password = password;
      let date = new Date();
      date.setDate(date.getDate() + 1);
      setAuthenticatedUser(user);
      setCookie('authenticatedUser', JSON.stringify(user), {
        path: '/',
        expires: date
      });
    }
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
    let message = error.response.data.error;
    if (typeof message !== 'string') {
      let formattedMessage = message.map(message => {
      if(message) return `<p class="server-error-message">${message}</p>`
      else return null
    }).join(' ')
    throw new Error(formattedMessage)
    } else {
      throw new Error(message)
    }
  }

  return (
    <Context.Provider value={{
      authenticatedUser,
      loading,
      actions: {
        setLoading,
        signIn,
        signOut,
        signUp,
        getCourses,
        getCourse
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