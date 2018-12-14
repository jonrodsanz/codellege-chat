const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  email: {
    type: String
  },
  technology: {
    type: String
  },
  connected: {
    type: Boolean,
    default: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Users', userSchema);