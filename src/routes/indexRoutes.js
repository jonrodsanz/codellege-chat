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

router.get('/chat', async (req, res) => {
  let connectedUsers;
  let messages;
  await User.find({})
    .then((users) => {
      connectedUsers = users;
    })
    .catch((err) => console.log(err))
  await Message.find({})
    .then((msgs) => messages = msgs)
    .catch((err) => console.log(err))
  res.render('index',{
    users: connectedUsers,
    messages
  })
})

module.exports = router;