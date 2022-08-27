const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'SEB_39_38';
const payload = { id: 'YHJ96', auth: true };
const option = { algorithm: 'HS256', expiresIn: '30m' };

/*

흐름도

클라이언트 -> (유저 정보) -> 서버
클라이언트 <- (jwt_token) <- 서버
클라이언트 -> (jwt_token) -> 서버
클라이언트 <- (리소스 정보) <- 서버
마지막 단계에서 무결성 유지?
*/

/* 로컬 스토리지 && 쿠키로 보내야 한다. */

/* 백엔드에서 jwt 권한을 확인한다? */

const signJWT = jwt.sign(payload, PRIVATE_KEY, option);

router.get('/', (req, res) => res.send('user'));

router.post('/', (req, res) => {
  const { id, pw } = req.body;
  if (id !== 'yhj96' || pw !== '1234') return res.status(404).send();
  return res.status(200).send(signJWT);
});

router.delete('/', (req, res) => res.send('user'));

module.exports = router;
