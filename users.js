const { trimString } = require('./utils')

const users = [
   {
      id: 1,
      name: 'John',
      room: 'room1',
   },
]

function addUser(user) {
   const userName = trimString(user.name)
   const roomName = trimString(user.room)
   const isExist = users.find(user => trimString(user.name) === userName && trimString(user.room) === roomName)
   if (isExist) {
      users.push({
         id: users.length + 1,
         name: userName,
         room: roomName,
      })
   }
   return users
}

module.exports = {
   addUser,
   users,
}
