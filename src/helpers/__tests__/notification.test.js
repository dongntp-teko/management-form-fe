// Created by thanhpd on 5/24/2019
// @flow
import { localStorageConstants } from 'constant';
import { notification } from 'antd';
import notificationHelper from '../notification';

afterEach(() => {
  localStorage.clear();
  notification.success.mockClear();
  notification.error.mockClear();
  notification.warning.mockClear();
});
notification.success = jest.fn(() => {});
notification.error = jest.fn(() => {});
notification.warning = jest.fn(() => {});

describe('test notificationHelper', () => {
  it('test getAllUserToNotifications', () => {
    const allUserToNotifications = notificationHelper.getAllUserToNotifications();
    expect(Object.values(allUserToNotifications).length).toBe(0);
    const originalValues = {
      1: [
        {id: 1},
        {id: 2},
      ],
      2: [
        {id: 3},
      ],
    };
    localStorage.setItem(localStorageConstants.NOTIFICATION_KEY, JSON.stringify(originalValues));
    const updatedUserToNotifications = notificationHelper.getAllUserToNotifications();
    expect(Object.values(updatedUserToNotifications).length).toBe(2);
  });

  it('test pushNotificationsForCurrentUser', () => {
    const notificationId = 1;
    const pushNotifications = {id: notificationId};
    const currentUserId = 1;
    localStorage.setItem(localStorageConstants.KEY_CURRENT_USER_ID, currentUserId);
    notificationHelper.pushNotificationsForCurrentUser(pushNotifications);
    const notifications = notificationHelper.getNotificationsForCurrentUser();
    expect(notifications.length).toBe(1);
    expect(notifications[0].id).toBe(notificationId);
  });

  it('test notify success', () => {
    const message = 'hello';
    const description = 'hello there';
    notificationHelper.success(message, description);
    expect(notification.success.mock.calls.length).toBe(1);
    expect(notification.success.mock.calls[0][0].message).toBe(message);
    expect(notification.success.mock.calls[0][0].description).toBe(description);
  });

  it('test notify error', () => {
    const message = 'hello';
    const description = 'hello there';
    notificationHelper.error(message, description);
    expect(notification.error.mock.calls.length).toBe(1);
    expect(notification.error.mock.calls[0][0].message).toBe(message);
    expect(notification.error.mock.calls[0][0].description).toBe(description);
  });

  it('test notify warning', () => {
    const message = 'hello';
    const description = 'hello there';
    notificationHelper.warning(message, description);
    expect(notification.warning.mock.calls.length).toBe(1);
    expect(notification.warning.mock.calls[0][0].message).toBe(message);
    expect(notification.warning.mock.calls[0][0].description).toBe(description);
  })
});
