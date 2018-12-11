const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://b.kisscc0.com/20180717/yse/kisscc0-guy-fawkes-mask-anonymous-anonymity-image-editing-anonymous-mask-5b4e56e6b1fb63.164184741531860710729.jpg'
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