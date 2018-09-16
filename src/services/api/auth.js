import store from '../../store'

function dummyLoginRequest (username, password) {
  return new Promise((resolve, reject) => {
    if (username === '123' && password === '123') resolve()
    else reject(new Error('Invalid username or password'))
  })
}

export default {
  login: function (username, password) {
    // Stub login, should be replace by request lib, e.g. axios or fetch
    return dummyLoginRequest(username, password).then(() => {
      store.commit('auth/setAuthInfo', {token: '123'})
    }).catch(error => { throw error.message })
  },
  logout: function () {
    store.commit('auth/setAuthInfo', null)
    return Promise.resolve()
  }
}
