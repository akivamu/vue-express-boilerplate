import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VuexHome from '@/components/vuex/Home'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store()

describe('vuex/Home.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(VuexHome, {store, localVue})
    expect(wrapper.find('.hello-message').text()).toEqual('Hello, guest')
  })
})
