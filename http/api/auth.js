'use strict'

const router = require('express').Router()
const passport = require('passport')
const tokenUtils = require('../token-utils')

router.post('/login', passport.authenticate('local', {session: false}), function (req, res) {
  const tokenData = tokenUtils.generateTokens(req.user.id)

  res.json({
    data: tokenData
  })
})

router.post('/refresh-token', function (req, res) {
  if (!req.body.token) {
    res.state(400).json({
      error: {
        message: 'Missing refresh token'
      }
    })
  } else {
    tokenUtils.refreshToken(req.body.token)
      .then(accessToken => {
        res.json({
          data: accessToken
        })
      })
      .catch(error => {
        res.status(401).json({
          error: {
            message: error.message
          }
        })
      })
  }
})

module.exports = router
