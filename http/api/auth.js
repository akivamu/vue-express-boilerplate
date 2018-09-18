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
      .then(data => {
        if (data.error) {
          res.status(401).json(data)
        } else {
          res.json({data: data})
        }
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }
})

router.post('/logout', function (req, res) {
  if (!req.body.access_token || !req.body.refresh_token) {
    res.status(400).json({
      error: {
        message: 'Missing tokens'
      }
    })
  } else {
    tokenUtils.revokeTokens(req.body.access_token, req.body.refresh_token)
      .then(() => { res.sendStatus(200) })
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
