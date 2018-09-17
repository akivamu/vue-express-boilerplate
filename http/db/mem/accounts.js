// TODO: this is dummy db, rewrite full db
const accounts = [
  {
    id: 1,
    username: 'admin',
    password: 'admin'
  },
  {
    id: 2,
    username: 'user',
    password: 'user'
  }
]

module.exports.findByUsername = (username) => {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].username === username) return Promise.resolve(accounts[i])
  }
  return Promise.resolve(null)
}

module.exports.findAll = () => {
  return Promise.resolve(accounts)
}
