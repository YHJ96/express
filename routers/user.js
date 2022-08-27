const express = require('express');
const router = express.Router();
const { jwtSign } = require('../utils/jwtToken');

/*

흐름도

클라이언트 -> (유저 정보) -> 서버
클라이언트 <- (jwt_token) <- 서버
클라이언트 -> (jwt_token) -> 서버
클라이언트 <- (리소스 정보) <- 서버
마지막 단계에서 무결성 유지?
*/

/* 
토큰을 2개 발급한다. 
access_token refresh_token
accres_token 30분
refresh_token 2주
refresh_token을 DB에 저장한다. 
*/

/* 로컬 스토리지 && 쿠키로 보내야 한다. */

/* 백엔드에서 jwt 권한을 확인한다? */

const store = {};

router.get('/', (req, res) => {
  return res.send('user');
});

router.post('/', async (req, res) => {
  const { id, pw } = req.body;
  if (id !== 'yhj96' || pw !== '1234') return res.status(404);
  const { access_token, refresh_token } = await jwtSign(id);
  store[id] = refresh_token;
  return res
    .status(200)
    .cookie('access_token', access_token, { httpOnly: true })
    .cookie('refresh_token', refresh_token, { httpOnly: true })
    .json({ auth: true });
});

router.delete('/', (req, res) => res.send('user'));

module.exports = router;
