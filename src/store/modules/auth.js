const state = {
  authInfo: null
}

// getters
const getters = {
  isLoggedIn: state => { return !!state.authInfo }
}

// actions
const actions = {}

// mutations
const mutations = {
  setAuthInfo (state, info) {
    state.authInfo = info
    localStorage.setItem('authInfo', JSON.stringify(info))
  },
  updateNewAccessToken (state, newAccessToken) {
    state.authInfo.access_token = newAccessToken.access_token
    state.authInfo.token_type = newAccessToken.token_type
    state.authInfo.expires_in = newAccessToken.expires_in
    localStorage.setItem('authInfo', JSON.stringify(state.authInfo))
  }
}

// Init store before use
try {
  state.authInfo = JSON.parse(localStorage.getItem('authInfo'))
} catch (e) {
  console.log('Invalid or empty authInfo')
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
