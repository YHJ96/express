const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'SEB_39_38';
const option = { algorithm: 'HS256', expiresIn: '30m' };

const jwtSign = async (payload) => {
  const access_jwt_token = jwt.sign({ id: payload }, PRIVATE_KEY, option);
  const refresh_jwt_token = jwt.sign({ id: payload }, PRIVATE_KEY, {
    ...option,
    expiresIn: '14d',
  });
  return { access_jwt_token, refresh_jwt_token };
};

const jwtVerify = async (access_token, refresh_token) => {
  const typeNumber = ['type1', 'type2', 'type3'];
  const isCheck = {
    access: await jwtAccessVerify(access_token),
    refresh: await jwtRefreshVerify(refresh_token),
  };
  if (isCheck.access) return typeNumber[0];
  if (isCheck.access === null && isCheck.refresh) return typeNumber[1];
  if (!(isCheck.access && isCheck.refresh)) return typeNumber[2];
};

const jwtAccessVerify = async (jwtToken) => {
  try {
    const decodeJWT = jwt.verify(jwtToken, PRIVATE_KEY);
    return decodeJWT;
  } catch {
    return null;
  }
};

const jwtRefreshVerify = async (jwtToken) => {
  try {
    const decodeJWT = jwt.verify(jwtToken, PRIVATE_KEY);
    return decodeJWT;
  } catch {
    return null;
  }
};

module.exports = {
  jwtSign,
  jwtVerify,
  jwtRefreshVerify,
};
