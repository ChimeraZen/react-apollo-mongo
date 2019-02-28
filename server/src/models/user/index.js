// models/user.js
import mongoose from 'mongoose'

import UserSchema from './schema'
import './validation'
import './methods'
import './statics'

// Model
const User = mongoose.model('user', UserSchema)

module.exports = User