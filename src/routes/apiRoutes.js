var express = require('express');
var router = express.Router();
var userController = require('../controllers/apiControllers');

router.get('/users', userController.list_all_users)
router.post('/users', userController.create_a_user)
router.delete('/users', userController.delete_all_users)

module.exports = router;