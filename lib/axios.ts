import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:54321/',
  timeout: 10000,
  withCredentials: true,
});

export default instance;
