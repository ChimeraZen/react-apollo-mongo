import { AuthenticationError } from 'apollo-server'
import UserSchema from './schema'
import bcrypt from 'bcrypt'

UserSchema.pre('save', async function(saltRounds=10) {
  this.password = await bcrypt.hash(this.password, saltRounds)
})

// Password
UserSchema.methods.validatePassword = async function(password) {
  const isValid = await bcrypt.compare(password, this.password)
  
  if (!isValid) {
    throw new AuthenticationError('Invalid credentials.')
  }
  
  return isValid
}