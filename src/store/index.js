import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    visitorName: ''
  },
  mutations: {
    setVisitorName (state, name) {
      state.visitorName = name
    }
  },
  actions: {
    setVisitorName (context, name) {
      context.commit('setVisitorName', name)
    }
  },
  modules: {
    auth
  },
  strict: debug
})
