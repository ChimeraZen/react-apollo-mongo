import mongoose from 'mongoose'
import dbURI from './connection'

const connect = async () => {
  console.log(`Server: CONNECTING...`)
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log(`Server: CONNECTION SUCCESSFUL!`)
  } catch(err) {
    console.log(`Server: !CONNECTION FAILURE!`)
    throw new Error(err)
  }
}

const disconnect = () => {
  mongoose.disconnect()
}

module.exports = {
  connect,
  disconnect
}
