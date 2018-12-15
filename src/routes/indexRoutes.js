var express = require('express');
var router = express.Router();
var userController = require('../controllers/apiControllers');
var User = require('../models/userModel')
var Message = require('../models/message')

router.get('/',(req, res) => {
  res.redirect('/register')
})

router.get('/register',(req, res) => {
  res.render('register')
})

router.get('/chat/:room', async (req, res) => {
  let connectedUsers;
  let messages;
  let technology =  req.params.room;
  await User.find({})
    .then((users) => {
      connectedUsers = users.filter((user) => {
        return user.technology == technology;
      });
    })
    .catch((err) => console.log(err))
  await Message.find({})
    .then((msgs) => {
      messages = msgs.filter((msg) => {
        // connectedUsers.forEach((connectedUser) => {
        //   console.log(connectedUser.username, msg.username, connectedUser.username == msg.username);
        //   return connectedUser.username == msg.username;
        // });
        for(let i = 0; i < connectedUsers.length; i++){
          if(connectedUsers[i].username === msg.username){
            return true;
          };
        }
      })
      // console.log(messages);
    })
    .catch((err) => console.log(err))
  res.render('index',{
    users: connectedUsers,
    messages,
    technology
  })
})

module.exports = router;