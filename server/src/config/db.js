import mongoose from 'mongoose'
import dbURI from './connection'

const connect = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  } catch(err) {
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
