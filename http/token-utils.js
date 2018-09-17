const config = require('config').jwt
const jwt = require('jsonwebtoken')

module.exports = {
  generateToken: function (payload) {
    return jwt.sign(payload, config.secret, {expiresIn: config.expiresIn})
  },
  verifyToken: function (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(decoded)
        }
      })
    })
  }
}
