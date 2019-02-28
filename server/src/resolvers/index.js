import { GraphQLDateTime } from 'graphql-iso-date'

import userResolvers from './user'

const customScalarResolver = {
  Date: GraphQLDateTime,
}

module.exports = [
  customScalarResolver,
  userResolvers, 
]