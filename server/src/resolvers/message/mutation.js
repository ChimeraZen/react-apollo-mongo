import mongoose from 'mongoose'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isMessageOwner } from '../../validation'

import { pubsub, EVENTS } from '../../subscriptions'

module.exports = {
  createMessage: combineResolvers(
    isAuthenticated,
    async (parent, { text }, { me, models }) => {
      const id = mongoose.Types.ObjectId()
      const userId = me.id

      // Create new message and save
      const message = await models.Message.create({
        id: id,
        text,
        userId,
      })

      pubsub.publish(EVENTS.MESSAGE.CREATED, {
        messageCreated: { message },
      })

      // Update user's messageIds
      await models.User.findOneAndUpdate(
        // Conditions
        { id: userId },

        // Update
        { "$push": { messageIds: id } }
      )

      return message
    }
  ),
  deleteMessage: combineResolvers(
    isAuthenticated,
    isMessageOwner,
    async (parent, { id }, { models }) => {
      const result = await models.Message.findOneAndDelete({ _id: id })
      
      return result
        ? true
        : false
    }
  ),
}