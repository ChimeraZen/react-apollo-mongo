import UserSchema from './schema'
import bcrypt from 'bcrypt'

// Login
UserSchema.statics.findByLogin = async function(login) {
  const user = await this.findOne({ $or:[
    { 'username': login }, 
    { 'email': login }
  ]})
  
  return user
    ? user
    : null
}


// Password
UserSchema.statics.generatePasswordHash = async (password, saltRounds=10) => {
  return password !== ''
    ? await bcrypt.hash(password, saltRounds)
    : password
}
UserSchema.statics.validatePassword = async (password, userPass) => {
  return await bcrypt.compare(password, userPass)
}