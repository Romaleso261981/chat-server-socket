const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const app = express()
const port = 3000
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const router = require('./routes')

app.use(
   cors({
      origin: '*', // Be sure to switch to your production domain
   })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

const server = http.createServer(app)

const io = socketIo(server, {
   cors: {
      origin: '*',
      methods: ['GET', 'POST'],
   },
})

io.on('connection', socket => {
   socket.on('join', ({ name, room }) => {
      socket.join(room)
      if (!name || !room) return socket.emit('error', { message: 'name and room are required' })

      const user = addUser({ name, room })

      socket.emit('message', {
         data: {
            user: { name: 'admin' },
            message: `${name}, welcome to room ${room}`,
         },
      })
      socket.broadcast.to(user.room).emit('message', {
         data: {
            user: 'admin',
            message: `${user.name} has joined!`,
         },
      })
   })

   io.on('disconnect', () => {
      console.log('user  disconnected')
   })
})

server.listen(port, () => console.log(`server is runing ${port}`))
