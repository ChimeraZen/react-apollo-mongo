import Query from './query'
import Mutation from './mutation'
import Subscription from './subscription'

module.exports = {
  Query,
  Mutation,
  Subscription,
  Message: {
    user: async (message, args, { models }) => {
      const { userId } = message
      
      return await models.User.findOne({ _id: userId })
    },
  },
}