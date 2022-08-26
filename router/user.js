const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('user'));
router.post('/', (req, res) => res.send('user'));
router.delete('/', (req, res) => res.send('user'));

module.exports = router;
