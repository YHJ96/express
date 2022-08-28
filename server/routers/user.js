const express = require('express');
const router = express.Router();
const axios = require('axios');
const { jwtSign } = require('../utils/jwtToken');

// code, type
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRETS = process.env.CLIENT_SECRETS;
const GIT_AUTH_API = 'https://github.com/login/oauth/access_token';
const GIT_RESOURCE_API = 'https://api.github.com/user';

router.get('/', (req, res) => res.send('user'));

// 로그아웃 토큰 삭제 구현
router.get('/logout', (req, res) => {
  res
    .clearCookie('access_jwt_token')
    .clearCookie('refresh_jwt_token')
    .status(200)
    .end();
});

router.post('/', async (req, res) => {
  const { code = null } = req.body;
  if (code === null) return res.status(404).end();
  // gitHub Access Token 가져오기
  try {
    const responseAuth = await axios.post(GIT_AUTH_API, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRETS,
      code: code,
    });
    const jokeURL = new URL(GIT_AUTH_API + `?${responseAuth.data}`);
    const access_token = jokeURL.searchParams.get('access_token');
    // acces_token 확인 완료
    // gitHub 리소스 서버에서 유저 정보 전송 받기
    const {
      data: { name },
    } = await axios.get(GIT_RESOURCE_API, {
      headers: { Authorization: `token ${access_token}` },
    });
    // 약속된 데이터 정제 완료 JWT 토큰 생성 시작
    const { access_jwt_token, refresh_jwt_token } = await jwtSign(name);
    // jwt 쿠키로 약속된 유저 데이터는 클라이언트로 보내기
    return res
      .status(200)
      .cookie('access_jwt_token', access_jwt_token, { httpOnly: true })
      .cookie('refresh_jwt_token', refresh_jwt_token, { httpOnly: true })
      .json({ id: name });
  } catch (err) {
    console.log(err.message);
    return res.status(404).end();
  }
});

module.exports = router;
