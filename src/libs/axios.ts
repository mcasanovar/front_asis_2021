import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_MONGODB_URI,
  // baseURL: 'http://localhost:3100/api/v2',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const configFormData = {
  baseURL: process.env.REACT_APP_MONGODB_URI,
  // baseURL: 'http://localhost:3100/api/v2',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    "Content-Type": "multipart/form-data",
  },
};

const httpClient = axios.create(config);
const httpClientFormData = axios.create(configFormData);

export { httpClient, httpClientFormData };