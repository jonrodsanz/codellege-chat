module.exports = function(io){

  io.on('connection', socket => {
    console.log("New user connected")
    socket.on("send message", (data) => {
      // To all the clients
      io.sockets.emit("new message", data)
    })
  })
  // Minuto 36:07 - Parte 01
}