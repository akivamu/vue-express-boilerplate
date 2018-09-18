import store from '../../store'
import axios from 'axios'
import router from '../../router'

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
    if (error.response.data.error && error.response.data.error.name === 'AccessTokenExpired') {
      // AccessTokenExpired: refresh token
      originalRequest._retry = true

      return axios.post('/auth/refresh-token', {token: store.state.auth.authInfo.refresh_token})
        .then(res => {
          store.commit('auth/updateNewAccessToken', res.data.data)

          setupAxiosAuth()

          // Modify old request with new token
          originalRequest.headers['Authorization'] = axios.defaults.headers.common['Authorization']
          return axios(originalRequest)
        })
        .catch(err => {
          // Refresh token failed. Logout
          AuthApi.logout(true)
          throw err
        })
    } else {
      // Other 401: logout to login page
      AuthApi.logout(true)
    }
  }

  return Promise.reject(error)
})

// Load authInfo from store
setupAxiosAuth()

const AuthApi = {
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
  logout: function (toLogInPage) {
    if (store.state.auth.authInfo) {
      axios.post('/auth/logout', store.state.auth.authInfo)
    }

    store.commit('auth/setAuthInfo', null)
    setupAxiosAuth()

    router.push(toLogInPage ? '/login' : '/')
    return Promise.resolve()
  }
}

export default AuthApi
