// Created by thanhpd 2/18/2019
// @flow

import { setGlobal } from 'reactn';
import auth from './auth';

setGlobal({
  ...auth,
  extraData: null,
  notifications: [],
});
