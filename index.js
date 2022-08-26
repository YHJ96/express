const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => res.send('Hello World!!'));

app.listen(PORT, () => console.log(`http://127.0.0.1:${3000}`));
