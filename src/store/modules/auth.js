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
