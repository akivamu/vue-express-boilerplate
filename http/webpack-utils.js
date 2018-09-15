module.exports = {
  getDevMiddleware: function () {
    const devConfigPromise = require('../build/webpack.dev.conf')
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')

    return devConfigPromise.then(devConfig => {
      const compiler = webpack(devConfig)
      const middleware = webpackDevMiddleware(compiler, {
        publicPath: devConfig.output.publicPath
      })

      return middleware
    })
  },
  getProductionDistPath: function () {
    const config = require('../build/webpack.prod.conf')
    return config.output.path
  }
}
