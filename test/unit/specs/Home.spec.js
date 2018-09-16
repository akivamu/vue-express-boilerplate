import { createLocalVue, shallowMount } from '@vue/test-utils'
import Home from '@/components/Home'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Home, {localVue})
    expect(wrapper.find('.home h1').text()).toEqual('Welcome to Your Vue.js App')
  })
})
