<template>
  <div class="container text-center">
    <form class="form-signin" @submit.prevent="login">
      <img class="mb-4" src="../../assets/logo.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputUsername" class="sr-only">Username</label>
      <input type="text" v-model="username" id="inputUsername" class="form-control"
             v-bind:class="{ 'is-invalid': error }" placeholder="Username" required=""
             autofocus="">
      <div class="invalid-feedback"></div>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="password" id="inputPassword" class="form-control"
             v-bind:class="{ 'is-invalid': error }" placeholder="Password"
             required="">
      <div class="invalid-feedback">{{ error }}</div>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login: function () {
      api.auth.login(this.username, this.password).then(() => {
        this.$router.push('/member')
      }).catch((error) => {
        this.error = error.message
      })
    }
  }
}
</script>

<style>
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

</style>
