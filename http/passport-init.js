const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')

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

module.exports = {
  attachToExpress: function (expressApp) {
    expressApp.use(passport.initialize())
  }
}
