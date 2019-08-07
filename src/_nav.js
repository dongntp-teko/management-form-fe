// @flow
import i18n from 'i18n';
import { actionConstants, appConstants, resourceConstants } from 'constant';

const { NOTE } = resourceConstants;
const { READ } = actionConstants;
const { INTERN } = appConstants;
const permission = (resource, action) => ({ app: INTERN, resource, action });

export default {
  items: [
    {
      name: i18n.t('Home'),
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'HOME',
      },
    },
    {
      title: true,
      name: 'Quản lý ABC',
      wrapper: {
        element: '',
        attributes: {},
      },
      class: '',
      permissions: [permission(NOTE)],
      relative: true,
    },
    {
      name: i18n.t('App'),
      url: '/app',
      icon: 'fa fa-sticky-note',
      // permissions: [permission(NOTE, READ)],
    },
  ],
};
