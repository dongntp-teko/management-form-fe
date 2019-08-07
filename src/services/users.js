// @flow
import { browserHistory } from 'helpers';
import cookieHelper from 'helpers/cookies';
import { appConstants, authConstants, localStorageConstants } from 'constant';
import { requestServices } from 'services/index';

const logout = () => {
  window.location.href = `${process.env.REACT_APP_IAM_BASE_URL ||
    ''}/web/logout?redirect_url=${window.location.href}`;
};

const denyAccess = () => {
  browserHistory.push('/403');
};

const getAccessToken = () =>
  cookieHelper.getByName(localStorageConstants.ACCESS_TOKEN);

const getCurrentUserInfo = () => {
  const appKey = Object.values(appConstants).join(',');
  return requestServices.userClient
    .get(authConstants.api.USER_DETAIL, { params: { appKey } })
    .then(response => response.data);
};

const getPpmUsers = () =>
  requestServices.ppmClient.get('/users').then(response => response.data);

const getCurrentUserId = () => {
  return Number.parseInt(localStorage.getItem(localStorageConstants.KEY_CURRENT_USER_ID), 10);
};

export default {
  logout,
  denyAccess,
  getCurrentUserInfo,
  getCurrentUserId,
  getAccessToken,
  getPpmUsers,
};
