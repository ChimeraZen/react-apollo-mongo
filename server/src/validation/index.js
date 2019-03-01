import { AuthenticationError, ForbiddenError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'
import jwt from 'jsonwebtoken'

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user
  return await jwt.sign(
    { id, email, username, role },
    secret,
    { expiresIn }
  )
}

const verifyToken = async req => {
  const token = req.headers["x-token"]

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.")
    }
  }
}

const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.')

const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
)

const isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  // Might have an issue with this
  const message = await models.Message.findById(id, { raw: true })

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }

  return skip
}

module.exports = {
  createToken,
  verifyToken,
  isAuthenticated,
  isAdmin,
  isMessageOwner,
}