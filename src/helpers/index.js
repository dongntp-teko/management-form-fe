// @flow
import { createBrowserHistory } from 'history';

export { default as notificationHelper } from './notification';
export { default as requestHelper } from './request';
export { default as localizationHelper } from './localization';
export { default as authHelper } from 'helpers/auth';
export { default as dateTimeHelper } from 'helpers/date-time';

export const browserHistory = createBrowserHistory();

export function calculateOptionHeight(option: Object, elId: string) {
  const heightUnit = 30;
  const el = document.getElementById(elId);
  if (el) {
    const elWidth = document.getElementById(elId).offsetWidth;
    const { length } = option.label;
    const numOfLines = Math.ceil(length / (elWidth / 4.9));
    return heightUnit * numOfLines;
  }
  return heightUnit;
}
