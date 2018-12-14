var express = require('express');
var router = express.Router();
var userController = require('../controllers/apiControllers');
var User = require('../models/userModel')

router.get('/',(req, res) => {
  res.redirect('/register')
})

router.get('/register',(req, res) => {
  res.render('register')
})

router.get('/chat', async (req, res) => {
  let connectedUsers;
  await User.find({},(err, users) => {
    if (err) console.log(err);
    connectedUsers = users.filter(user => {
      return user.connected;
    });
  })
  res.render('index',{
    users: connectedUsers
  })
})

module.exports = router;