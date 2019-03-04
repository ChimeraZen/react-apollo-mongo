module.exports.batchUsers = async (keys, models) => {
  const users = await models.User.find({})
    .where('_id')
    .in(keys)
  
console.log('batchUsers', users, keys)
  return keys.map(key => users.find(user => user.id === key))
}