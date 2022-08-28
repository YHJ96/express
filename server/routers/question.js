const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
  res.json({ id: 'YHJ96', content: '질문 있습니다.' }),
);

router.post('/', (req, res) => res.send('question'));
router.delete('/', (req, res) => res.send('question'));

module.exports = router;
