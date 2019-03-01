import { combineResolvers } from 'graphql-resolvers'
import { isAdmin } from '../../validation'

module.exports = {
  signUp: async (
    parent,
    { username, email, password, role },
    { models, secret }
  ) => {
    return await models.User.signUp({
      username,
      email,
      role,
      password
    }, secret)
  },

  signIn: async (
    parent,
    { login, password },
    { models, secret }
  ) => {
    return await models.User.signIn(login, password, secret)
  },

  deleteUser: combineResolvers(
    isAdmin,
    async (parent, { id }, { models }) => {
      const result = await models.User.findOneAndDelete({ _id: id })

      return result
        ? true
        : false
    }
  ),
}