// Created by thanhpd on 3/1/2019
// @flow
import React from 'react';
import DefaultLayout from 'components/DefaultLayout/DefaultLayout';
import i18n from 'i18n';

const Dashboard = React.lazy(() => import('components/Dashboard/Dashboard'));
const AppList = React.lazy(() => import('components/Application/Application'));


const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: DefaultLayout,
  },
  {
    path: '/dashboard',
    exact: true,
    name: i18n.t('Home'),
    component: Dashboard,
  },
  {
    path: '/app',
    exact: true,
    name: i18n.t('Application'),
    component: AppList,
  },
  
];

export default routes;
