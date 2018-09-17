const path = require('path')

// ConfigJS
process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname) + '/config/'
const config = require('config')

// Express
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const passportUtils = require('./passport-utils')
passportUtils.attachToExpress(app)

// Rest
app.use('/auth', require('./api/auth'))
app.use('/account', passportUtils.BearerAuthenticated, require('./api/account'))

// Web: handle refresh page action
const history = require('connect-history-api-fallback')
app.use(history())

// Web
const webpackUtils = require('./webpack-utils')
switch (config.env) {
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
app.listen(config.port, config.host, function onStart (err) {
  if (err) {
    console.error(err)
  }
  console.log('==> Listening on http://%s:%s', config.host, config.port)
})
