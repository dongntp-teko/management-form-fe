// Created by thanhpd on 5/21/2019
// @flow

const logout = jest.fn(() => Promise.resolve({}));
const denyAccess = jest.fn(() => Promise.resolve({}));
const canAccessApp = jest.fn(() => Promise.resolve({}));
const getCurrentUserInfo = jest.fn(() => Promise.resolve({}));
const getAccessToken = jest.fn(() => Promise.resolve({}));
const getPpmUsers = jest.fn(() => Promise.resolve({}));


export default {
  logout,
  denyAccess,
  canAccessApp,
  getCurrentUserInfo,
  getAccessToken,
  getPpmUsers,
};
