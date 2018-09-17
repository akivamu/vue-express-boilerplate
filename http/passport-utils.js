const passport = require('passport')
const db = require('./db')

// Local
const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    db.accounts.findByUsername(username)
      .then(account => {
        if (!account) return done(null, false)
        if (account.password !== password) return done(null, false)
        return done(null, account)
      })
      .catch(error => {
        return done(error)
      })
  }
))

// Bearer
const BearerStrategy = require('passport-http-bearer').Strategy
passport.use(new BearerStrategy(
  (accessToken, done) => {
    db.accessTokens.findByToken(accessToken)
      .then(token => {
        // TODO: parse token and return done(null, user)

        return done(null, token || false)
      })
      .catch(error => {
        return done(error)
      })
  }
))

module.exports = {
  attachToExpress: function (expressApp) {
    expressApp.use(passport.initialize())
  }
}
