import Query from './query'
import Mutation from './mutation'

module.exports = {
  Query,
  Mutation,
  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.find({ userId: user.id})
    },
  },
}