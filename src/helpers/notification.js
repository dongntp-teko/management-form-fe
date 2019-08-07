// Created by thanhpd on 3/11/2019
// @flow
import { notification } from 'antd';
import localStorageConstant from 'constant/local-storage';
import { notificationHelper } from 'helpers/index';
import uuid from 'uuid';
import { userServices } from 'services';
import _ from 'lodash';
import type { NotificationT } from 'types/notification';
import { notificationConstants } from 'constant';

const MAX_PERSISTED_NOTIFICATION = 100;
const notificationTypes = notificationConstants.types;

const saveNewNotification = (title, message, type) => {

  notificationHelper.pushNotificationsForCurrentUser({
    id: uuid(),
    title,
    message,
    createdAt: new Date().toISOString(),
    type,
    seen: false,
  });

};
const success = (message: string, description: string = '') => {
  notification.success({message, description});
  saveNewNotification(message, description, notificationTypes.success.value)
};

const error = (message: string, description: string = '') => {
  notification.error({message, description});
  saveNewNotification(message, description, notificationTypes.danger.value)
};

const warning = (message: string, description: string = '') => {
  notification.warning({message, description});
  saveNewNotification(message, description, notificationTypes.warning.value)
};

const getNotificationsForCurrentUser = () => {
  const currentUserId = userServices.getCurrentUserId();
  const userToNotifications = JSON.parse(localStorage.getItem(localStorageConstant.NOTIFICATION_KEY) || '{}');
  return userToNotifications[currentUserId] || [];
};

const getAllUserToNotifications = () => {
  return JSON.parse(localStorage.getItem(localStorageConstant.NOTIFICATION_KEY) || '{}');
};

const putNotificationsForCurrentUser = (notifications: [NotificationT]) => {
  const currentUserId = userServices.getCurrentUserId();
  const limitedNotifications = _.orderBy(notifications, ['createdAt'], ['desc']).slice(0, MAX_PERSISTED_NOTIFICATION);
  if (currentUserId) {
    const userToNotifications = getAllUserToNotifications();
    localStorage.setItem(localStorageConstant.NOTIFICATION_KEY, JSON.stringify({
      ...userToNotifications,
      [currentUserId]: limitedNotifications,
    }));
  }
};

const pushNotificationsForCurrentUser = (n: NotificationT) => {
  const currentUserId = userServices.getCurrentUserId();
  if (currentUserId) {
    const notifications = getNotificationsForCurrentUser();
    notifications.push(n);
    putNotificationsForCurrentUser(notifications);
  }
};

export default {
  success,
  error,
  warning,
  getNotificationsForCurrentUser,
  pushNotificationsForCurrentUser,
  putNotificationsForCurrentUser,
  getAllUserToNotifications,
};
