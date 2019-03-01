import { pubsub, EVENTS } from '../../subscriptions'

module.exports = {
  messageCreated: {
    subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
  },
}