const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = 8080;

const userRouter = require('./routers/user');
const answerRouter = require('./routers/answer');
const questionRouter = require('./routers/question');
const { jwtSign, jwtVerify, jwtRefreshVerify } = require('./utils/jwtToken');

const userCheckMiddleWare = async (req, res, next) => {
  const { originalUrl, method } = req;
  if (originalUrl === '/user' && method === 'POST') return next();
  const { access_token, refresh_token } = req.cookies;
  const type = await jwtVerify(access_token, refresh_token);
  const token = await jwtRefreshVerify(refresh_token);
  console.log(type, token);
  if (type === 'type1') return next();
  if (type === 'type2') {
    const { access_token } = await jwtSign(token.id);
    res.cookie('access_token', access_token, { httpOnly: true });
  }
  if (type === 'type3') return res.send('로그인을 다시 해주세요.');
  return res.send('타입이 없습니다.');
};

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(userCheckMiddleWare);

app.use('/user', userRouter);
app.use('/answer', answerRouter);
app.use('/question', questionRouter);

app.get('/', (req, res) => res.send('Hello World!!'));

app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`));
