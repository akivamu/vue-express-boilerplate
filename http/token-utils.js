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
          return resolve({
            error: {
              name: err.name === 'TokenExpiredError' ? 'AccessTokenExpired' : err.name,
              message: err.message
            }
          })
        } else {
          // Check if revoked token
          db.tokens.findRevokedAccessToken(accessToken)
            .then(token => {
              if (token) {
                resolve({
                  error: {
                    name: 'AccessTokenRevoked',
                    message: 'Access token is revoked'
                  }
                })
              } else resolve({payload: decoded})
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    })
  },
  refreshToken: function (refreshToken) {
    return new Promise(function (resolve, reject) {
      // JWT verify first
      jwt.verify(refreshToken, config.secret, function (err, decoded) {
        if (err) {
          return resolve({
            error: {
              name: err.name === 'TokenExpiredError' ? 'RefreshTokenExpired' : err.name,
              message: err.message
            }
          })
        } else {
          // Check exist in database
          db.tokens.findRefreshToken(refreshToken)
            .then(token => {
              if (!token) {
                return resolve({
                  error: {
                    name: 'NonExistRefreshToken',
                    message: 'Non exist refresh token'
                  }
                })
              }

              // Generate new access token
              const payload = buildTokenPayload(decoded)
              const accessToken = generateAccessToken(payload)
              resolve({
                access_token: accessToken.token,
                token_type: 'bearer',
                expires_in: accessToken.expiresIn
              })
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    })
  },
  revokeTokens: function (accessToken, refreshToken) {
    return new Promise(function (resolve, reject) {
      jwt.verify(accessToken, config.secret, function (err, decoded) {
        if (!err) db.tokens.saveRevokedAccessTokens(accessToken)
      })

      jwt.verify(refreshToken, config.secret, function (err, decoded) {
        if (!err) db.tokens.deleteRefreshToken(refreshToken)
      })

      resolve()
    })
  }
}
