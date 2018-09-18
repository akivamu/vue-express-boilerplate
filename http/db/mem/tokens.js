// TODO: this is dummy db, rewrite full db
const _ = require('lodash')
const refreshTokens = {}
const revokedAccessTokens = []

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

module.exports.deleteRefreshToken = (refreshToken) => {
  const userIds = _.keys(refreshTokens)

  for (let i = 0; i < userIds.length; i++) {
    if (refreshTokens[userIds[i]] === refreshToken) {
      delete refreshTokens[userIds[i]]
    }
  }
  return Promise.resolve()
}

module.exports.saveRefreshToken = (userId, refreshToken) => {
  refreshTokens[userId] = refreshToken
  return Promise.resolve()
}

module.exports.findRevokedAccessToken = (accessToken) => {
  return Promise.resolve(_.find(revokedAccessTokens, function (value) {
    return accessToken === value
  }))
}

module.exports.saveRevokedAccessTokens = (token) => {
  revokedAccessTokens.push(token)
  return Promise.resolve()
}
