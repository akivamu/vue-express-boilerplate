<template>
  <div class="home">
    <h1>You are logged in.</h1>
    <button class="btn btn-primary" v-on:click="logout">Logout</button>
    <p>Currently has {{accounts.length}} accounts in the system</p>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  data () {
    return {
      accounts: []
    }
  },
  mounted: function () {
    api.account.getAll().then((accounts) => {
      this.accounts = accounts
    })
  },
  methods: {
    logout: function () {
      api.auth.logout().then(() => {
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-weight: normal;
}
</style>
