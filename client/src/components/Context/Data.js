import config from './config';
import axios from 'axios';

export default class Data {
  api(path, method = 'GET', data = null, requiresAuth = false, credentials = null) {
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
  
  async getCourses() {
    const courses = await this.api(`/courses`)
    return courses
  }

  async getCourse(id) {
    const course = await this.api(`/courses/${id}`)
    return course
  }

  async getUser(username, password) {
    const user = await this.api(`/users`, 'GET', null, true, { username, password })
    return user
  }

  async createUser(newUser) {
    const user = await this.api(`/users`, 'POST', newUser)
    return user;
  }
}



