function getMessages(req, res) {
	res.send('i am getMessages')
}

function addMessage(req, res) {
	res.send('i am addMessage')
 }

module.exports = {
	getMessages,
	addMessage
}
