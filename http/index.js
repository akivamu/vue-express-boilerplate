const path = require('path')
const express = require('express')

const app = express()

const env = process.env.NODE_ENV || 'development'
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '8080'

const webpackUtils = require('./webpack-utils')
switch (env) {
  case 'development': {
    webpackUtils.getDevMiddleware().then(middleware => app.use(middleware))
    break
  }
  case 'production': {
    app.use(express.static(path.resolve(webpackUtils.getProductionDistPath())))
    break
  }
}

// Start http server
app.listen(port, host, function onStart (err) {
  if (err) {
    console.error(err)
  }
  console.log('==> Listening on http://%s:%s', host, port)
})
