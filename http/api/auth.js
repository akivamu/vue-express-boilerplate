'use strict'

const router = require('express').Router()
const db = require('../db')

router.post('/login', function (req, res) {
  db.accounts.findByUsernameAndPassword(req.body.username, req.body.password)
    .then((account) => {
      res.json({
        status: 'success',
        data: {
          token: 'test-token'
        }
      })
    })
    .catch((error) => {
      res.status(401).json({
        status: 'fail',
        message: error.message
      })
    })
})

module.exports = router
