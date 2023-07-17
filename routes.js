const express = require('express');
const router = express.Router();

const { getMessages, addMessage } = require('./controllers/messages');

router.get('/', getMessages);
router.post('/message', addMessage);

module.exports = router;