module.exports = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  database: {
    name: 'mem'
  },
  jwt: {
    secret: 'jwt-secret',
    accessTokenExpiresIn: '1h',
    refreshTokenExpiresIn: '1d'
  }
}
