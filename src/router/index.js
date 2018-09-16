import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import VuexHome from '@/components/vuex/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/vuex',
      name: 'VuexHome',
      component: VuexHome
    }
  ]
})
