import WebSocket from 'ws';
import {v4 as uuid} from "uuid";
import {existsSync, readFileSync, writeFile} from "fs";
const log = existsSync('log') && readFileSync('log', 'utf-8');
const messages = log ? JSON.parse(log) : [];

const wss = new WebSocket.Server({port: 8080});

wss.on('connection', (ws) => {
	console.log('New client connected');
	const id = uuid();
	ws.on('message', ( message) => {
		messages.push(({message, name:id}));
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send([{message, name: 'kolya', id}]);
			}
		});
	});

	// ws.send('Welcome new client!');
});