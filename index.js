const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const port = 3000;

const router = require('./routes');

app.use(cors({
	 origin: '*', // Be sure to switch to your production domain
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

const server = http.createServer(app);

const io = socketIo(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}

});

server.listen(port, ()=>console.log('server is runing '))



