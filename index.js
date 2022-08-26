const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const PORT = 8080;

const userRouter = require('./router/user');
const answerRouter = require('./router/answer');
const questionRouter = require('./router/question');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/answer', answerRouter);

app.get('/', (req, res) => res.send('Hello World!!'));

app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`));
