import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
    select: false
  },
  role: {
    type: String,
  },
  messageIds: [{
    type: String,
  }],
})

module.exports = UserSchema