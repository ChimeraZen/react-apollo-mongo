import Query from './query'
import Mutation from './mutation'
import Subscription from './subscription'

module.exports = {
  Query,
  Mutation,
  Subscription,
  Message: {
    user: async (message, args, { loaders }) => {
      return await loaders.user.load(message.userId)
    },
  },
}