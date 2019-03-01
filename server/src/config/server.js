import { ApolloServer } from 'apollo-server-express'

import schema from '../schema'
import resolvers from '../resolvers'
import models from '../models'

import { verifyToken } from '../validation'

import dotenv from 'dotenv'
dotenv.config()

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  path: "/graphql",
  context: async ({ req, connection }) => {
    if(connection) {
      return {
        models,
      }
    }
    
    if (req) {
      const me = await verifyToken(req)
      
      return {
        models,
        me,
        secret: process.env.SECRET,
      }
    }
  }
})

module.exports = server