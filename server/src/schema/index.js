import { gql } from 'apollo-server-express'

import userSchema from './user'
import messageSchema from './message'

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

module.exports = [
  linkSchema, 
  userSchema,
  messageSchema,
]