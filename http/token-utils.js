const _ = require('lodash')
const config = require('config').jwt
const jwt = require('jsonwebtoken')
const db = require('./db')

const tokenPayloadFields = ['id']

function buildTokenPayload (data) {
  const payload = {}

  _.forEach(tokenPayloadFields, function (fieldName) {
    payload[fieldName] = data[fieldName]
  })

  return payload
}

function generateAccessToken (payload) {
  const token = jwt.sign(payload, config.secret, {expiresIn: config.accessTokenExpiresIn})
  const decodedPayload = jwt.decode(token)
  return {
    token: token,
    expiresIn: decodedPayload.exp
  }
}

function generateRefreshToken (payload) {
  return jwt.sign(payload, config.secret, {expiresIn: config.refreshTokenExpiresIn})
}

module.exports = {
  generateTokens (userId) {
    const payload = buildTokenPayload({id: userId})
    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    db.tokens.saveRefreshToken(userId, refreshToken)

    return {
      access_token: accessToken.token,
      token_type: 'bearer',
      expires_in: accessToken.expiresIn,
      refresh_token: refreshToken
    }
  },
  verifyAccessToken: function (accessToken) {
    return new Promise((resolve, reject) => {
      jwt.verify(accessToken, config.secret, (err, decoded) => {
        if (err) {
          return reject(err)
        } else {
          // TODO: check if revoked token

          return resolve(decoded)
        }
      })
    })
  },
  refreshToken: function (refreshToken) {
    return new Promise(function (resolve, reject) {
      // JWT verify first
      jwt.verify(refreshToken, config.secret, function (err, decoded) {
        if (err) {
          reject(err)
        } else {
          // Check exist in database
          db.tokens.findRefreshToken(refreshToken)
            .then(token => {
              if (!token) return reject(new Error('Non exist refresh token'))

              // Generate new access token
              const payload = buildTokenPayload(decoded)
              const accessToken = generateAccessToken(payload)
              resolve({
                access_token: accessToken.token,
                token_type: 'bearer',
                expires_in: accessToken.expiresIn
              })
            })
        }
      })
    })
  }
}
