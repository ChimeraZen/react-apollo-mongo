// backend/config/connection.js
import dotenv from 'dotenv'
dotenv.config()

const username = process.env.DB_USER
const password = process.env.DB_PASS
const hostname = process.env.DB_HOSTNAME
const database = process.env.DATABASE

module.exports = process.env.TEST_DATABASE
  ? `mongodb://localhost:27017/${process.env.TEST_DATABASE}`
  : `${host}${username}:${password}@${hostname}/${database}`
