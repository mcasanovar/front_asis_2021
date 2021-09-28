import axios from "axios";
import { getUserFromLocalStorage } from "../functions/getLocalStorage";

const userLogged = getUserFromLocalStorage();

const config = {
  baseURL: process.env.REACT_APP_API_DEV,
  // baseURL: process.env.REACT_APP_API_STAGING,
  // baseURL: process.env.REACT_APP_API_PROD,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': `${!!userLogged?.token ? userLogged.token : ''}`
  },
  // adapter: cache.adapter
};

const configFormData = {
  baseURL: process.env.REACT_APP_API_DEV,
  // baseURL: process.env.REACT_APP_API_STAGING,
  // baseURL: process.env.REACT_APP_API_PROD,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    "Content-Type": "multipart/form-data",
    'x-access-token': `${!!userLogged?.token ? userLogged.token : ''}`
  },
};

const httpClient = axios.create(config);
const httpClientFormData = axios.create(configFormData);

export { httpClient, httpClientFormData };