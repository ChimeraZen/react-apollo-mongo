import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import cors from 'cors'

const app = express()
const port = 8000

app.use(cors())

const schema = {}
const resolvers = {}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`)
})