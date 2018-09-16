import Vue from 'vue'
import Vuex from 'vuex'

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
  strict: debug
})
