import { ApolloServer } from 'apollo-server-express'
import { AuthenticationError } from "apollo-server"
import http from 'http'

import express from 'express'
import cors from 'cors'

import db from './config/db'

import schema from './schema'
import resolvers from './resolvers'
import models from './models'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 8000

app.use(cors())

const getMe = async req => {
  const token = req.headers["x-token"]

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.")
    }
  }
}

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
      const me = await getMe(req)
      
      return {
        models,
        me,
        secret: process.env.SECRET,
      }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

db.connect().then(() => {
  httpServer.listen({ port }, () => {
    console.log(`Server: ACTIVE`)
  })
})
