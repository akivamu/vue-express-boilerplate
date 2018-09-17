import axios from 'axios'

export default {
  getAll: function () {
    return axios.get('/account')
      .then(res => {
        return res.data.data
      })
      .catch(error => {
        throw error.response.data
      })
  }
}
