// TODO: this is dummy db, rewrite full db
module.exports.findByUsernameAndPassword = (username, password) => {
  if (username === 'test' && password === 'test') {
    return Promise.resolve({
      id: 1,
      username: 'test',
      password: 'test'
    })
  } else {
    return Promise.reject(new Error('Invalid username or password'))
  }
}
