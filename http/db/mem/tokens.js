// TODO: this is dummy db, rewrite full db
const _ = require('lodash')
const refreshTokens = {}

module.exports.findRefreshToken = (refreshToken) => {
  const userIds = _.keys(refreshTokens)

  for (let i = 0; i < userIds.length; i++) {
    if (refreshTokens[userIds[i]] === refreshToken) {
      return Promise.resolve({
        userId: userIds[i],
        refreshToken: refreshToken
      })
    }
  }
  return Promise.resolve(null)
}

module.exports.saveRefreshToken = (userId, refreshToken) => {
  refreshTokens[userId] = refreshToken
  return Promise.resolve()
}
