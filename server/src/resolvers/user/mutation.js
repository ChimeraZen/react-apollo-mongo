import { AuthenticationError, UserInputError } from 'apollo-server'
import { combineResolvers } from 'graphql-resolvers'
import { isAdmin, createToken } from '../../validation'

module.exports = {
  signUp: async (
    parent,
    { username, email, password, role },
    { models, secret },
  ) => {
    const userExists = await models.User.findByLogin(username)

    if (!userExists) {
    const user = await models.User.create({
        username,
        email,
        role,
        password: await models.User.generatePasswordHash(password),
      })

      return { token: createToken(user, secret, '30m') }
    } else {
      throw new UserInputError(
        'User already exists',
      )
    }
  },

  signIn: async (
    parent,
    { login, password },
    { models, secret },
  ) => {
    if (!login) {
      throw new UserInputError(
        'A username or email is required'
      )
    }
    if (!password) {
      throw new UserInputError(
        'A password is required'
      )
    }

    const user = await models.User.findByLogin(login)

    if (!user) {
      throw new UserInputError(
        'No user found with these credentials',
      )
    }

    // eventually need to remove password from model before being returned and store the correction as a static in the model schema
    const isValid = await models.User.validatePassword(password, user.password)

    if (!isValid) {
      throw new AuthenticationError('Invalid password.')
    }

    return { token: createToken(user, secret, '30m') }
  },

  deleteUser: combineResolvers(
    isAdmin,
    async (parent, { id }, { models }) => {
      const result = await models.User.findOneAndDelete({ _id: id })

      return result
        ? true
        : false
    },
  ),
}