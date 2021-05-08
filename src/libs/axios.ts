import axios from "axios";

const config = {
  // baseURL: process.env.REACT_APP_API_DEV,
  baseURL: 'https://sslprotocol.api-asis.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const configFormData = {
  // baseURL: process.env.REACT_APP_API_DEV,
  baseURL: 'https://sslprotocol.api-asis.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    "Content-Type": "multipart/form-data",
  },
};

const httpClient = axios.create(config);
const httpClientFormData = axios.create(configFormData);

export { httpClient, httpClientFormData };