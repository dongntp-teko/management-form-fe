// Created by thanhpd on 6/10/2019
// @flow
import { useGlobal } from 'reactn';
import { authConstants } from 'constant';
import { authHelper } from 'helpers';

type CanT = {
  app: string,
  resource: string,
  action: string,
  yes: Function,
  no: Function,
}

const Can = (props: CanT) => {
  const [currentPermissions] = useGlobal(authConstants.KEY_CURRENT_PERMISSIONS);

  const { yes, app, action, resource, no } = props;
  return authHelper.checkPermission(currentPermissions, app, resource, action)
    ? yes()
    : no();
};

Can.defaultProps = {
  yes: () => null,
  no: () => null,
};

export default Can;
