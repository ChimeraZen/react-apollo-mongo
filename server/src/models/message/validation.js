// Validation
import MessageSchema from './schema'

MessageSchema.path('text')
  .validate(value => {
    return value !== ''
  }, 'Message must have some content')

//Add validation for userId === me