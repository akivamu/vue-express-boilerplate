// TODO: this is dummy db, rewrite full db
const data = []

module.exports.findByToken = (token) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].access_token === token) return Promise.resolve(data[i])
  }
  return Promise.resolve(null)
}

module.exports.save = (token) => {
  data.push(token)
  return Promise.resolve()
}
