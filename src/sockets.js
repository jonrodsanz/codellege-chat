module.exports = function(io){
  var emoji = require('node-emoji')

  io.on('connection', socket => {
    console.log("New user connected")
    socket.on("send message", (data) => {
      // To all the clients
      data = emoji.emojify(data)
      io.sockets.emit("new message", data)
    })
  })
  // Minuto 36:07 - Parte 01
}