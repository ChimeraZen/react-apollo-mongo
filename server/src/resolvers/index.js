import { GraphQLDateTime } from 'graphql-iso-date'

import userResolvers from './user'
import messageResolvers from './message'

const customScalarResolver = {
  Date: GraphQLDateTime,
}

module.exports = [
  customScalarResolver,
  userResolvers, 
  messageResolvers,
]