module.exports = function(io){
  let Message = require('./models/message')
  // var emoji = require('node-emoji')
  
  io.on('connection', socket => {

    socket.on('send message', (data) => {
      let message = new Message(data);
      message.save(function (err) { 
        if (err) return handleError(err); 
        // saved! 
      });
      io.sockets.emit("new message", {
        username: data.username,
        avatar: data.avatar,
        message: data.message
      });
    })
    // console.log("A user connected")
    // socket.on("send message", (data) => {
    //   // To all the clients
    //   message = emoji.emojify(data.message)
    //   io.sockets.emit("new message", {
    //     message: message,
    //     username: socket.nickname,
    //     avatar: data.avatar
    //   })
    // })

    // socket.on('disconnect', function(){
    //   nicknames.splice(nicknames.indexOf(socket.nickname))
    //   io.sockets.emit("user left", socket.nickname)
    // });

    // socket.on('new user', (data, callback) => {
    //   if(!nicknames.includes(data) && data !== ""){
    //     callback(true)
    //     socket.nickname = data
    //     nicknames.push(socket.nickname)
    //     io.sockets.emit("user join", socket.nickname)
    //   } else{
    //     callback(false)
    //   }
    // });
  })
}