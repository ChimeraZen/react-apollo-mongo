import { PubSub } from 'apollo-server'

import * as MESSAGE_EVENTS from './message'

const pubsub = new PubSub()
const EVENTS = {
  MESSAGE: MESSAGE_EVENTS,
}

module.exports = {
  pubsub,
  EVENTS,
}