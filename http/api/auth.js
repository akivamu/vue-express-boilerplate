'use strict'

const router = require('express').Router()
const passport = require('passport')
const db = require('../db')

function generateToken (userId) {
  const token = {
    access_token: '123', // TODO: generate
    token_type: 'bearer',
    user_id: userId
  }

  db.accessTokens.save(token)

  return token
}

router.post('/login', passport.authenticate('local', {session: false}), function (req, res) {
  const token = generateToken(req.user.id)

  res.json({
    data: token
  })
})

module.exports = router
