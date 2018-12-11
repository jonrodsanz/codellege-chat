var express = require('express');
var router = express.Router();
var userController = require('../controllers/apiControllers');

router.get('/',(req, res) => {
  res.redirect('/register')
})

router.get('/register',(req, res) => {
  res.render('register')
})

router.get('/chat',(req, res) => {
  res.render('index')
})

module.exports = router;