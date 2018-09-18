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
const tokenUtils = require('./token-utils')
passport.use(new BearerStrategy(
  (accessToken, done) => {
    tokenUtils.verifyAccessToken(accessToken)
      .then(tokenPayload => {
        return done(null, tokenPayload)
      })
      .catch(error => {
        return done(error)
      })
  }
))

function bearerAuthenticated (req, res, next) {
  passport.authenticate('bearer', function (err, user, info) {
    if (err) {
      res.status(401).json({error: err})
    } else if (!user) {
      res.status(401).json({
        error: {
          message: 'Unauthorized (general)'
        }
      })
    } else {
      req.logIn(user, {session: false}, function (err) {
        if (err) return next(err)
        return next()
      })
    }
  })(req, res, next)
}

module.exports = {
  attachToExpress: function (expressApp) {
    expressApp.use(passport.initialize())
  },
  BearerAuthenticated: bearerAuthenticated
}
