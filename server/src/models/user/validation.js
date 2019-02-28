// Validation
import UserSchema from './schema'

UserSchema.path('username')
  .validate(value => {
    return value !== ''
  }, 'User must have a username')

UserSchema.path('email')
  .validate(value => {
    return value !== ''
  }, 'User must have an email')
  .validate(value => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)
  }, 'Email must be a valid email address')

UserSchema.path('password')
  .validate(value => {
  return value !== ''
}, 'User must have a password')
