// models/user.js
import mongoose from 'mongoose'

import MessageSchema from './schema'
import './validation'

// Model
const Message = mongoose.model('message', MessageSchema)

module.exports = Message