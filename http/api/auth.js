'use strict'

const router = require('express').Router()
const passport = require('passport')

router.post('/login', passport.authenticate('local', {session: false}), function (req, res) {
  res.json({
    data: {
      token: 'test-token'
    }
  })
})

module.exports = router
