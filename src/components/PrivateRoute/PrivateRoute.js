// Created by thanhpd 2/18/2019
// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import userServices from 'services/users';
import { useUserInfo } from 'hooks/user';
import Page403 from 'components/Page403';

type PropsT = {
  location: Object,
  component: any,
}

export default (props: PropsT) => {
  if (!userServices.getAccessToken()) {
    userServices.logout();
    return false;
  }

  const {currentUser, currentPermissions} = useUserInfo();
  const { component: Component, ...rest } = props;
  if (!currentUser) {
    return false;
  }
  if (currentPermissions && currentPermissions.length === 0) {
    return <Page403 />;
  }

  return (
    <Route
      {...rest}
      render={routeProps => (
        <Component {...routeProps} activeUser={currentUser} />
      )}
    />
  );
};
