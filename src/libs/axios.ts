import axios from "axios";
// import { setupCache } from 'axios-cache-adapter';

// Create `axios-cache-adapter` instance
// const cache = setupCache({
//   maxAge: 15 * 60 * 1000
// })

const config = {
  // baseURL: process.env.REACT_APP_API_DEV,
  baseURL: 'https://asis-api-2021.herokuapp.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // adapter: cache.adapter
};

const configFormData = {
  // baseURL: process.env.REACT_APP_API_DEV,
  baseURL: 'https://asis-api-2021.herokuapp.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    "Content-Type": "multipart/form-data",
  },
};

const httpClient = axios.create(config);
const httpClientFormData = axios.create(configFormData);

export { httpClient, httpClientFormData };