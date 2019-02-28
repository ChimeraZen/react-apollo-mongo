import UserSchema from './schema'

// Remove password from user
UserSchema.methods.toJSON = function() {
 const obj = this.toObject()
  console.log('toJSON', obj)
 delete obj.password
 return obj
}