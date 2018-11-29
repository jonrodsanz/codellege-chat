const socketio = require('socket.io') 
const express  = require('express')
const http     = require('http')
const path     = require('path')
const app      = express() // Instancia de express

// settings
app.set('port', process.env.PORT || 4000)

const server = http.createServer(app)
const io     = socketio.listen(server)

require('./sockets')(io)

// static files
app.use(express.static(path.join(__dirname, 'public')))

// starting the server
server.listen(app.get('port'), () => {
  console.log(`Server listening up on port ${app.get('port')}`);
})
