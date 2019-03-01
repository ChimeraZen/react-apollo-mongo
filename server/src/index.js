
import http from 'http'

import express from 'express'
import cors from 'cors'

import db from './config/db'
import server from './config/server'

const app = express()
const port = 8000

app.use(cors())

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

db.connect().then(() => {
  httpServer.listen({ port }, () => {
    console.log(`Server: ACTIVE`)
  })
})
