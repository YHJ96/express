const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const PORT = 8080;

const userRouter = require('./routers/user');
const answerRouter = require('./routers/answer');
const questionRouter = require('./routers/question');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/user', userRouter);
app.use('/answer', answerRouter);
app.use('/question', questionRouter);

app.get('/', (req, res) => res.send('Hello World!!'));

app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`));
