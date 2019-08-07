// Created by thanhpd on 6/11/2019
// @flow
import { useGlobal } from 'reactn';
import { authHelper } from 'helpers';
import { authConstants, localStorageConstants } from 'constant';
import userServices from 'services/users';
import { useEffect } from 'react';


export const useAuthorizationNavigation = (defaultValue) => {
  const [currentPermissions] = useGlobal(authConstants.KEY_CURRENT_PERMISSIONS);
  const { items } = defaultValue;
  let filteredItems = authHelper.filterHasPermissions(items, currentPermissions);
  filteredItems = filteredItems.map(item => {
    const { children } = item;
    if (children) {
      return { ...item, children: authHelper.filterHasPermissions(children, currentPermissions) };
    }
    return item;
  });

  const filteredNavigation = { items: filteredItems };
  return {
    filteredNavigation,
  };
};

export const useAuthorizationRoute = (defaultValue) => {
  const [currentPermissions] = useGlobal(authConstants.KEY_CURRENT_PERMISSIONS);
  const filteredRoutes = authHelper.filterHasPermissions(defaultValue, currentPermissions);
  return {
    filteredRoutes,
  };
};

const getPermissionFromUser = currentUser => currentUser.roles ? currentUser.roles.map(role => {
  return role.permissions.map(permission => permission.key);
}).reduce((acc, curr) => [...acc, ...curr], []) : [];

export const useUserInfo = () => {
  const [currentUser, setCurrentUser] = useGlobal(authConstants.KEY_CURRENT_USER);
  const [currentPermissions, setCurrentPermissions] = useGlobal(authConstants.KEY_CURRENT_PERMISSIONS);

  useEffect(() => {
    if (userServices.getAccessToken() && !currentUser) {
      userServices.getCurrentUserInfo().then(userData => {
        setCurrentUser(userData);
        setCurrentPermissions(getPermissionFromUser(userData));
      });
    }
  }, []);

  if (currentUser && userServices.getCurrentUserId() !== currentUser.id) {
    localStorage.setItem(
      localStorageConstants.KEY_CURRENT_USER_ID,
      currentUser.id,
    );
  }

  return {
    currentUser,
    currentPermissions,
  };
};
