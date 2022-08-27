const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('answer'));
router.post('/', (req, res) => res.send('answer'));
router.delete('/', (req, res) => res.send('answer'));

module.exports = router;
