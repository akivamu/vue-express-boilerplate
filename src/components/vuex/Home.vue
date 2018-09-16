<template>
  <div class="vuex-home">
    <h1>This is VueX demo page</h1>
    <p class="hello-message">Hello, {{ name || "guest" }}</p>
    <visitor-name-input></visitor-name-input>
  </div>
</template>

<script>
import VisitorNameInput from './VisitorNameInput'

export default {
  components: {
    VisitorNameInput
  },
  computed: {
    name () {
      return this.$store.state.visitorName
    }
  }
}
</script>

<style scoped>
.vuex-home {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-weight: normal;
}
</style>
