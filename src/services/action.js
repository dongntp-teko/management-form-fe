// @flow

// const auth = useGlobal(authConstants.KEY_CURRENT_USER);

export const getToken = (auth) => {
  
  console.log(auth[0])
  const jwt = require('jsonwebtoken');

  const identity = `{"roles":${JSON.stringify(auth[0].roles)}}`;

  console.log(auth)

  const secret_key = 'managementform';

  const token = jwt.sign(
    { identity },
    secret_key,
    { expiresIn: 60 * 60 },
    { algorithm: 'RS256' },
  );
  return token
};
