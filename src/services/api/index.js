/* global API_URL */
import auth from './auth'
import account from './account'
import axios from 'axios'

axios.defaults.baseURL = API_URL

export default {
  auth,
  account
}
