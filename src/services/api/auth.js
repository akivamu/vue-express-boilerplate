import store from '../../store'
import axios from 'axios'

export default {
  login: function (username, password) {
    return axios.post('/auth/login', {username: username, password: password})
      .then(res => {
        store.commit('auth/setAuthInfo', res.data.data)
      })
      .catch(error => {
        throw error.response.data
      })
  },
  logout: function () {
    store.commit('auth/setAuthInfo', null)
    return Promise.resolve()
  }
}
