const express = require('express');
const router = express.Router();

const guessController = require('../controllers/GuessController');

router.get('/', guessController.guessEmail);

module.exports = router;
