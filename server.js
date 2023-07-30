import ws from 'ws';
const { Server } = ws;
import { v4 as uuid } from 'uuid';
import { writeFile, readFileSync, existsSync } from 'fs';
const clients = {};
const log = existsSync('log') && readFileSync('log', 'utf-8');
const messages = log ? JSON.parse(log) : [];

const wss = new Server({ port: 8080 });

wss.on('connection', ws => {
   const id = uuid();
   clients[id] = ws;
   ws.send(JSON.stringify({ type: 'connection', id }));

   ws.on('message', rawMessage => {
      const { url, message, id, name } = JSON.parse(rawMessage);
      messages.push({ name, url, message, id });

      for (const id in clients) {
         clients[id].send(JSON.stringify(messages));
      }
   });

   ws.on('close', () => {
      delete clients[id];
      console.log(`Client is closed ${id}`);
   });
});

process.on('SIGINT', () => {
   wss.close();
   writeFile('log', JSON.stringify(messages), err => {
      if (err) {
         console.log(err);
      }
      process.exit();
   });
});
