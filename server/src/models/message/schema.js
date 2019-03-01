import mongoose from 'mongoose'

const Schema = mongoose.Schema
const MessageSchema = new Schema({
  text: {
    type: String
  },
  createdAt: {
    type: Date
  },
  userId: {
    type: String
  }
})

module.exports = MessageSchema