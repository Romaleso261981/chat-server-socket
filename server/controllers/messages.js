const arr = [
	{
		id: 1,
		name: 'user1',
		message: 'hello'
	},
	{
		id: 2,
		name: 'user1',
		message: 'hello'
	},
	{
		id: 3,
		name: 'user1',
		message: 'hello'
	},
	{
		id: 4,
		name: 'user1',
		message: 'hello'
	},
	{
		id: 5,
		name: 'user1',
		message: 'hello'
	},
]

function getMessages(req, res) {
	console.log('server')
	res.send('i am getMessages')
}

function addMessage(req, res) {
	res.send('i am addMessage')
 }

module.exports = {
	getMessages,
	addMessage
}
