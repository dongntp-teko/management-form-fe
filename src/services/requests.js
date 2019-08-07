// @flow
import axios from 'axios/index';
import cookieHelper from 'helpers/cookies';
import { localStorageConstants } from 'constant';
import { requestHelper } from 'helpers';

export const BASE_IAM_API_URL: string = `${process.env.REACT_APP_IAM_BASE_URL ||
  'localhost:3000'}/api`;

export const BASE_USER_URL: string = `${process.env.REACT_APP_USER_URL ||
  'localhost:3000'}/api`;

axios.interceptors.response.use(
  response => response,
  error => {
    requestHelper.handleRequestError(error);
    return Promise.reject(error);
  },
);

const getAuthorization = () => `Bearer ${cookieHelper.getByName(
  localStorageConstants.ACCESS_TOKEN,
)}`;

const authClient = axios.create({
  baseURL: BASE_IAM_API_URL,
  headers: {
    Authorization: getAuthorization(),
  },
  withCredentials: true,
});


const userClient = axios.create({
  baseURL: BASE_USER_URL,
  headers: {
    Authorization: getAuthorization(),
  },
  withCredentials: true,
});

userClient.interceptors.response.use(
  response => response,
  error => {
    requestHelper.handleRequestError(error);
    return Promise.reject(error);
  },
);


authClient.interceptors.response.use(
  response => response,
  error => {
    requestHelper.handleRequestError(error);
    return Promise.reject(error);
  },
);

export default {
  authClient,
  userClient,
};
