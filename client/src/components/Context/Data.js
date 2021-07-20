import config from './config';
import axios from 'axios';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const options = {
      url: `${config.apiBaseUrl}${path}`,
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8', 
      },
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    // Check if auth is required
    if (requiresAuth) {    
      const encodedCredentials = Buffer.from(`${credentials.username}:${credentials.password}`, 'base64');
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return axios(options);
  }

  async getCourses() {
    const response = await this.api(`/courses`);
    if (response.status === 200) {
      return response;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`);
    if (response.status === 200) {
      return response;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async getUser(username, password) {
    const response = await this.api(`/courses`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return data => data;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
}
