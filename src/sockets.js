module.exports = function(io){
  var emoji = require('node-emoji')

  let nicknames = [];

  io.on('connection', socket => {
    // console.log("A user connected")
    socket.on("send message", (data) => {
      // To all the clients
      data = emoji.emojify(data)
      io.sockets.emit("new message", data)
    })

    socket.on('disconnect', function(){
      nicknames.splice(nicknames.indexOf(socket.nickname))
      io.sockets.emit("user left", socket.nickname)
    });

    socket.on('new user', (data, callback) => {
      if(!nicknames.includes(data) && data !== ""){
        callback(true)
        socket.nickname = data
        nicknames.push(socket.nickname)
        io.sockets.emit("user join", socket.nickname)
      } else{
        callback(false)
      }
    });
  })
  // Minuto 36:07 - Parte 01
}