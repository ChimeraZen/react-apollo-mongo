module.exports = {
  users: async (parent, args, { models }) => {
    return await models.User.find()
  },
  user: async (parent, { id }, { models }) => {
    const user = await models.User.findOne({ _id: id })

    return user
      ? user
      : null
  },
  me: async (parent, args, { me }) => {
    return me
      ? await models.User.findOne({ _id: me.id })
      : null
  },
}