// @flow

import { authConstants } from 'constant';

const all = '*';

type PermissionType = {
  app: string,
  resource: string,
  action: string,
}

type PermissionItemT = {
  permissions: [PermissionType],
  relative: ?boolean,
}

const permission = (app: string, resource: ?string, action: ?string) => {
  return [app, resource, action].filter(x => !!x).join(':');

};

const checkPermission = (permissions: [string], app: string, resource: string, action: string) => {
  const perform = permission(app, resource, action);
  const performAllAction = permission(app, resource, all);
  const performAllResource = permission(app, all, all);
  const allPerforms = [perform, performAllAction, performAllResource];

  return !!(permissions && permissions.find(p => allPerforms.includes(p)));
};

const filterHasPermissions = (items: [PermissionItemT], currentPermissions: [string]) => items.filter(item => {
  const { permissions, relative } = item;
  if (!permissions) {
    return true;
  }
  const intersection = permissions.find(x => {
    const { app, resource, action } = x;
    if (relative) {
      return currentPermissions.some(p => {
        return p.startsWith(permission(app, resource, action))
          || p.startsWith(permission(app, resource, all))
          || p.startsWith(permission(app, all, all));
      });
    }
    return checkPermission(currentPermissions, app, resource, action);
  });
  return !!intersection;
});

const setAllPPMPermission = (setGlobal) => {
  setGlobal({ [authConstants.KEY_CURRENT_PERMISSIONS]: ['ppm:*:*'] });
};


export default {
  filterHasPermissions,
  checkPermission,
  permission,
  setAllPPMPermission,
};
