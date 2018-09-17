import store from '../../store'
import axios from 'axios'

function setAuthInfo (authInfo) {
  if (authInfo && authInfo.token_type && authInfo.access_token) {
    axios.defaults.headers.common['Authorization'] = authInfo.token_type + ' ' + authInfo.access_token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

// Load authInfo from store
setAuthInfo(store.state.auth.authInfo)

export default {
  login: function (username, password) {
    return axios.post('/auth/login', {username: username, password: password})
      .then(res => {
        store.commit('auth/setAuthInfo', res.data.data)
        setAuthInfo(res.data.data)
      })
      .catch(error => {
        throw error.response.data
      })
  },
  logout: function () {
    store.commit('auth/setAuthInfo', null)
    setAuthInfo(null)
    return Promise.resolve()
  }
}
