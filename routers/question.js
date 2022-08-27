const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('question'));
router.post('/', (req, res) => res.send('question'));
router.delete('/', (req, res) => res.send('question'));

module.exports = router;
