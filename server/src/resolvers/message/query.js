module.exports = {
  messages: async (parent, args, { models }) => {
    return await models.Message.find()
  },
  message: async (parent, { id }, { models }) => {
    return await models.Message.findOne({ _id: id })
  },
}