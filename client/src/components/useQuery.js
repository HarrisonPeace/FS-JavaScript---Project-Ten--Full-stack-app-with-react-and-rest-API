
import { useHistory } from 'react-router-dom';
import config from './Context/config';
import axios from 'axios';

const api = (path, method = 'GET', data = null, requiresAuth = false, credentials = null) => {
    const options = {
      url: `${config.apiBaseUrl}${path}`,
      method,
      data,
      headers: {
        'Content-Type': 'application/json; charset=utf-8', 
      },
    };
    // Check if auth is required
    if (requiresAuth) {
      options.auth = {}
      options.auth.username = credentials.username;
      options.auth.password = credentials.password;    
    }
    return axios(options);
}

const GetCourse = async (id) => {
  const history = useHistory();

  const course = await api(`/courses/${id}`)
  .then(({ code, status, ...apiData }) => {
    if (code > 400) {
      history.replace(history.location.pathname, { 
        errorStatusCode: code 
      });
    } else {
      return course
    }
  });
}

export default GetCourse;
