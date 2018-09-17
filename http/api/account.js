'use strict'

const router = require('express').Router()
const passport = require('passport')
const db = require('../db')

router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
  db.accounts.findAll()
    .then(accounts => {
      res.json({
        data: accounts
      })
    })
})

module.exports = router
