const config = require('config')

let db = require('./' + config.database.name)
db.init(config.database)

module.exports = db
