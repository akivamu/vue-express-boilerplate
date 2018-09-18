import store from '../../store'
import axios from 'axios'

function setupAxiosAuth () {
  const authInfo = store.state.auth.authInfo

  if (authInfo && authInfo.token_type && authInfo.access_token) {
    axios.defaults.headers.common['Authorization'] = authInfo.token_type + ' ' + authInfo.access_token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

// Auto refresh token
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const originalRequest = error.config

  // Handle all 401 error
  if (error.response.status === 401 && !originalRequest._retry) {
    // Token expired
    if (error.response.data.error.name === 'TokenExpiredError') {
      originalRequest._retry = true

      return axios.post('/auth/refresh-token', {token: store.state.auth.authInfo.refresh_token})
        .then(res => {
          store.commit('auth/updateNewAccessToken', res.data.data)

          setupAxiosAuth()

          // Modify old request with new token
          originalRequest.headers['Authorization'] = axios.defaults.headers.common['Authorization']
          return axios(originalRequest)
        })
    }
  }

  return Promise.reject(error)
})

// Load authInfo from store
setupAxiosAuth()

export default {
  login: function (username, password) {
    return axios.post('/auth/login', {username: username, password: password})
      .then(res => {
        store.commit('auth/setAuthInfo', res.data.data)
        setupAxiosAuth()
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          throw new Error('Invalid username or password')
        } else {
          throw new Error('Error occurs, please try again later')
        }
      })
  },
  logout: function () {
    store.commit('auth/setAuthInfo', null)
    setupAxiosAuth()
    return Promise.resolve()
  }
}
