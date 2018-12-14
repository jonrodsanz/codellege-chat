const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    // default: 'https://png2.kisspng.com/20180402/uzq/kisspng-computer-icons-astronaut-outer-space-astronaut-5ac1d584aecd37.613204711522652548716.png'
  },
  message: {
    type: String
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Messages', messageSchema);