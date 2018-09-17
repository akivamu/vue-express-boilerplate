'use strict'

const router = require('express').Router()
const db = require('../db')

router.get('/', function (req, res) {
  db.accounts.findAll()
    .then(accounts => {
      res.json({
        data: accounts
      })
    })
})

module.exports = router
