const express = require('express');
const router = express.Router();

// const { getMessages, addMessage } = require('./controllers/messages');

router.get('/', (req,res)=> {
	console.log(req)
	res.send('i am getMessages')	
});
// router.post('/message', addMessage);

module.exports = router;
