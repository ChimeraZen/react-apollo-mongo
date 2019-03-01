import { UserInputError } from 'apollo-server'
import UserSchema from './schema'
import { createToken } from '../../validation'

// Login
UserSchema.statics.signIn = async function(login, password, secret) {
  if (!login) {
    throw new UserInputError('A username or email is required')
  }
  
  if (!password) {
    throw new UserInputError('A password is required')
  }
  
  const user = await this.findOne({ $or:[
    { 'username': login }, 
    { 'email': login }
  ]})
  
  if (!user) {
    throw new UserInputError('No user found with these credentials')
  }
    
  // Validate password
  await user.validatePassword(password)
    
  return { token: createToken(user, secret, '30m') }
}
UserSchema.statics.signUp = async function(user, secret) {
  const userExists = await this.findOne({ $or:[
    { 'username': user.username }, 
    { 'email': user.email }
  ]})
  
  if (userExists) {
    throw new UserInputError('User already exists')
  }
  
  const newUser = await this.create(user)
    
  return { token: createToken(newUser, secret, '30m') }
}