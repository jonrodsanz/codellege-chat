let User = require('../models/userModel');

//GET api/users
module.exports.list_all_users = function (req, res) {
  User.find({}, (err, users) => {
    if(err)
      res.send(err)
    res.json(users)
  })
}

// DELETE api/users
module.exports.delete_all_users = async function (req, res) {
  var usersQuantity;
  await User.find({}, (err, users) => {
    if (err)
      res.send(err);
    // console.log(users);
    usersQuantity = users.length;
  });
  User.deleteMany({}, (err, users) => {
    if(err)
      res.send(err)
    res.send(`${usersQuantity} users succesfully deleted`)
  });
}

// POST api/users
module.exports.create_a_user = function (req, res) {
  console.log(req.body);
  var newUser = new User(req.body);
  let room = req.body.technology;
  newUser.save(function(err, user){
    if(err)
      res.send(err);
    res.redirect(`../chat/${room}`)
  })
}