const express = require('express');
const router = require('./routes');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
const ws = http.createServer(app);
const route = require('./routes');

const PORT = 8080;


app.use(
   cors({
      origin: '*',
   })
);


const io = new Server(ws, {
   cors: {
      origin: '*',
      methods: ['GET', 'POST'],
   },
});

io.on('connection', (socket) => {
   

   io.on('disconnect', () => {
      console.log('user disconnected');
   });

});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', route);



const server = http.createServer(app);

server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
