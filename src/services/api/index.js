/* global API_URL */
import auth from './auth'
import axios from 'axios'

axios.defaults.baseURL = API_URL

export default {
  auth
}
