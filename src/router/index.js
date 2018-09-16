import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '@/components/Home'
import VuexHome from '@/components/vuex/Home'
import MemberHome from '@/components/member/Home'
import Login from '@/components/auth/Login'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['auth/isLoggedIn']) {
    next()
    return
  }
  next('/member')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isLoggedIn']) {
    next()
    return
  }
  next('/login')
}

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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/member',
      name: 'MemberHome',
      component: MemberHome,
      beforeEnter: ifAuthenticated
    }
  ]
})
